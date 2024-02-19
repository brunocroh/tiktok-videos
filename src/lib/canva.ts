import fs from 'fs';
import wrap from 'word-wrap';
import { createCanvas } from 'canvas';

export default function createImageText(str: string, filename: string) {
  const width = 405;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.font = '32px Impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFA400';
  ctx.strokeStyle = 'black';

  const text = formatTitle(str);
  text.forEach((line, i) => {
    const p = [line, width / 2, 120 + 50 * i];
    ctx.fillText(...p);
    ctx.strokeText(...p);
  });

  const buffer = canvas.toBuffer();
  fs.writeFileSync(`${filename}.png`, buffer);

  return `${filename}.png`;
}

function getMaxNextLine(input: string, maxChars = 25) {
  const allWords = input.split(' ');
  const lineIndex: any = allWords.reduce(
    (prev: any, cur: any, index: number) => {
      console.log({ prev });
      if (prev?.done) return prev;
      const endLastWord = prev?.position || 0;
      const position = endLastWord + 1 + cur.length;
      return position >= maxChars ? { done: true, index } : { position, index };
    }
  );
  const line = allWords.slice(0, lineIndex.index).join(' ');
  const remainingChars = allWords.slice(lineIndex.index).join(' ');
  return { line, remainingChars };
}

function formatTitle(title: string) {
  return wrap(title, { width: 25 }).split('\n');
}
