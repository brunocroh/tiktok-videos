import fs from 'fs';
const { createCanvas } = require('canvas');

export default function createImageText(str: string, filename: string) {
  const width = 720;
  const height = 1280;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.font = '36px Impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFA400';
  ctx.strokeStyle = 'black';

  const text = formatTitle(str);
  text.forEach((line, i) => {
    ctx.fillText(line, 0, 180 + 60 * i);
    ctx.strokeText(line, 0, 180 + 60 * i);
  });

  const buffer = canvas.toBuffer();
  fs.writeFileSync(`${filename}.png`, buffer);

  return `${filename}.png`;
}

function getMaxNextLine(input: string, maxChars = 40) {
  const allWords = input.split(' ');
  const lineIndex: any = allWords.reduce(
    (prev: any, cur: any, index: number) => {
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
  const output = [];
  let stagingText = title;

  for (let i = 0; i <= Math.ceil(title.length / 40) + 1; i++) {
    const text = getMaxNextLine(stagingText);
    output.push(text.line);
    stagingText = text.remainingChars;
  }
  return output;
}
