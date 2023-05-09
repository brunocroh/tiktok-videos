import { getRandomInt } from '../utils';
import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';

const CWD = process.cwd();

type CreateVideoProps = {
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
  const { duration } = props;
  const video = `${CWD}/videos/nature/heart.mp4`;
  try {
    const metadata = await getMetadata(video);

    if (!metadata.format.duration)
      throw new Error(`Fail to get metadata of video: ${video}`);

    const startTime = getRandomInt(0, metadata.format.duration - duration);

    ffmpeg(video)
      .inputOption(`-ss ${startTime}`)
      .inputOption(`-t ${duration}`)
      .videoFilters([
        {
          filter: 'drawtext',
          options: {
            fontfile: 'Lucida Grande.ttf',
            text: 'THIS IS TEXT',
            fontsize: 64,
            fontcolor: 'yellow',
            x: '(main_w/2-text_w/2)',
            y: 50,
            shadowcolor: 'black',
            shadowx: 2,
            shadowy: 2,
          },
        },
      ])
      .output(`${CWD}/output/teste.mp4`)
      .on('end', () => {
        console.log('terminou papai');
      })
      .run();
  } catch (error) {
    console.log(error);
  }
}
