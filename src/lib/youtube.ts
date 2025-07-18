import youtubedl from 'youtube-dl-exec';
import { progressBar } from './progressBar';

type GetVideo = {
  url: string;
  name: string;
  folder: string;
};

export async function getVideo({ url, name, folder }: GetVideo) {
  try {
    const promise = youtubedl.exec(url, {
      output: `./videos/${folder}/${name || '%(title)s'}.%(ext)s`,
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio',
    });
    const result = await progressBar(promise);
  } catch (error) {
    console.log(error);
  }
}
