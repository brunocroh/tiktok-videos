import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { createAudio } from './lib/text-to-speech';
import { createVideo as ffmpegCreateVideo } from './lib/ffmpeg';
import { getPrompt } from './lib/chatgpt';
import createImageText from './lib/canva';

export async function createVideo(theme: string) {
  const folder = createFolder();
  let lines: any = [];
  const prompt = await getPrompt(theme);

  if (!prompt) throw new Error('Chatgpt not generated right prompt');

  lines.push(prompt.title);
  lines = lines.concat(prompt.texts);
  let startTime = 1;

  let audios = await Promise.all(
    lines.map(async (l: string, i: number) => {
      const image = createImageText(l, `${folder}/tmp/${i}`);
      const audio = await createAudio(l, `${folder}/tmp/${i}`);
      return {
        ...audio,
        text: l,
        image,
        i,
      };
    })
  );

  audios = audios.map((a: any) => {
    const st = startTime;
    startTime = Math.ceil(startTime + a.duration);

    return {
      ...a,
      startTime: st,
    };
  });

  const duration = audios.reduce((agg, audio) => agg + audio.duration, 0);

  ffmpegCreateVideo({
    audios,
    duration,
  });
}

function createFolder() {
  const uuid = uuidv4();
  const folderName = `./output/videos/${uuid}`;
  fs.mkdirSync(`${folderName}/tmp`, {
    recursive: true,
  });
  return folderName;
}

function deleteFolder(folderName: string) {
  return fs.rmdirSync(folderName);
}
