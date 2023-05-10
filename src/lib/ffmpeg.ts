import { getRandomInt } from '../utils';
import ffmpeg, { FfmpegCommand, FfprobeData } from 'fluent-ffmpeg';

const CWD = process.cwd();

type CreateVideoProps = {
  audios: {
    filename: string;
    duration: number;
    startTime: number;
    text: string;
  }[];
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
  const { duration, audios } = props;
  const video = `${CWD}/videos/nature/earth.mp4`;
  try {
    const metadata = await getMetadata(video);

    if (!metadata.format.duration)
      throw new Error(`Fail to get metadata of video: ${video}`);
    const startTime = getRandomInt(0, metadata.format.duration - duration);
    const { width, height } = metadata.streams[0];

    if (!width || !height)
      throw new Error('width or height not exists on metadata of video');

    const x = width - (1080 / 1920) * height;

    const audioFilename = await concatAudioFiles(audios);

    const stagingVideo = ffmpeg(video)
      .inputOption(`-ss ${startTime}`)
      .inputOption(`-t ${duration}`)
      .audioFilters([
        {
          filter: 'volume',
          options: {
            volume: 0.3,
          },
        },
      ])
      .addInput(audioFilename)
      .addOptions(['-map 0:v', '-map 1:a'])
      .videoFilters([`crop=${width - x}:${height}`])
      .size(`${width}x${height}`)
      .videoFilters(
        audios.map((audio: any) => ({
          filter: 'drawtext',
          options: {
            fontfile: 'Lucida Grande.ttf',
            text: audio.text,
            enable: `between(t, ${audio.startTime}, ${
              audio.startTime + audio.duration
            })`,
            fontsize: 48,
            fontcolor: 'yellow',
            x: '(main_w/2-text_w/2)',
            y: 50,
            shadowcolor: 'black',
            shadowx: 2,
            shadowy: 2,
          },
        }))
      )
      .on('end', () => {
        console.log('terminou papai');
      })
      .on('stderr', (e) => console.log(e))
      .saveToFile(`${CWD}/output/teste.mp4`);

    return stagingVideo;
  } catch (error) {
    console.log(error);
  }
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
