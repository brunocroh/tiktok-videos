import youtubedl from 'youtube-dl-exec';
import { progressBar } from './progressBar';

const POKEMON_VIDEO = 'https://youtu.be/gutR_LNoZw0';
const SNOW_VIDEO = 'https://youtu.be/ADDFmfOeihU';

type GetVideo = {
  url: string;
  name: string;
  folder: string;
};

export async function getVideo({ url, name, folder }: GetVideo) {
  try {
    const promise = youtubedl.exec(url, {
      output: `./videos/${folder}/${name || '%(title)s'}.%(ext)s`,
      format: 'mp4/bestvideo',
    });
    const result = await progressBar(promise);
  } catch (error) {
    console.log(error);
  }
}
