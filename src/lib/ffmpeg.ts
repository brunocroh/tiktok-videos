import { getRandomInt } from '../utils';
import ffmpeg, { FfmpegCommand, FfprobeData } from 'fluent-ffmpeg';

const CWD = process.cwd();

type Audio = {
  filename: string;
  duration: number;
  startTime: number;
  text: string;
};

type CreateVideoProps = {
  audios: Audio[];
  duration: number;
};

async function getMetadata(video: string): Promise<FfprobeData> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(video, (err, data: FfprobeData) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export async function createVideo(props: CreateVideoProps) {
  const { audios } = props;
  const file = await createVideoBase({ ...props, audios });

  let _video = ffmpeg(file);
  _video = audios.reduce((v, a: Audio) => {
    return v.input(`${a.filename}.png`);
  }, _video);

  _video
    .complexFilter(
      audios.map((audio: Audio, i: number) => ({
        filter: 'overlay',
        scale: '1:1',
        inputs: `${!i ? '[0:v]' : '[tmp]'}[${i + 1}:v]`,
        outputs: 'tmp',
        options: {
          enable: `between(t, ${audio.startTime}, ${
            audio.startTime + audio.duration
          })`,
        },
      })),
      'tmp'
    )
    .on('end', () => {
      console.log('terminou tudo');
    })
    .outputOptions(['-map 0:a'])
    .output(`${CWD}/output/teste-final.mp4`)
    .run();

  return _video;
}

async function createVideoBase(props: CreateVideoProps): Promise<string> {
  const { duration, audios } = props;
  const video = `${CWD}/videos/city/snowfall.mp4`;

  const metadata = await getMetadata(video);

  if (!metadata.format.duration)
    throw new Error(`Fail to get metadata of video: ${video}`);
  const startTime = getRandomInt(0, metadata.format.duration - duration);
  const { width, height } = metadata.streams[0];

  if (!width || !height)
    throw new Error('width or height not exists on metadata of video');

  const x = width - (1080 / 1920) * height;
  console.log({ w: width - x, height });

  const audioFilename = await concatAudioFiles(audios);
  return new Promise((resolve, reject) => {
    try {
      const stagingVideo = ffmpeg(video)
        .inputOption(`-ss ${startTime}`)
        .inputOption(`-t ${duration}`)
        .audioFilters([
          {
            filter: 'volume',
            options: {
              volume: 0.8,
            },
          },
        ])
        .addInput(audioFilename)
        .addOptions(['-map 0:v', '-map 1:a'])
        .videoFilters([`crop=${width - x}:${height}`])
        // .size(`${width}x${height}`)
        .on('end', () => {
          resolve(`${CWD}/output/teste.mp4`);
        })
        .saveToFile(`${CWD}/output/teste.mp4`);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function concatAudioFiles(audios: any): Promise<string> {
  return new Promise((resolve) => {
    const ffAudios = ffmpeg(`${audios[0].filename}.mp3`);

    for (let i = 1; i < audios.length; i++) {
      ffAudios.input(`${audios[i].filename}.mp3`);
    }

    ffAudios
      .noVideo()
      .mergeToFile(`${CWD}/output/tmp.mp3`, `${CWD}/output/`)
      .output(`${CWD}/output/teste.mp3`)
      .on('end', () => resolve(`${CWD}/output/teste.mp3`))
      .run();
  });
}
