import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { createAudio } from './lib/text-to-speech';
import { getPrompt } from './lib/chatgpt';

export async function createVideo(theme: string) {
  const folder = createFolder();
  let lines = [];
  const prompt = await getPrompt(theme);

  if (!prompt) throw new Error('Chatgpt not generated right prompt');

  console.log({ prompt });

  lines.push(prompt.title);
  lines = lines.concat(prompt.texts);

  lines.map((l: string, i: number) => {
    createAudio(l, `${folder}/tmp/${i}`);
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
