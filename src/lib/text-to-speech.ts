import textoToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import mp3Duration from 'mp3-duration';

const client = new textoToSpeech.TextToSpeechClient();

export async function createAudio(text: string, filename: string) {
  const [response] = await client.synthesizeSpeech({
    input: {
      ssml: `
  <speak>
    <break time='500ms'/>
    ${text}
    <break time='1200ms'/>
  </speak>
`,
    },
    voice: {
      languageCode: 'pt-BR',
      name: 'pt-BR-wavenet-B',
      ssmlGender: 'MALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  });

  const writeFile = util.promisify(fs.writeFile);
  await writeFile(
    `${filename}.mp3`,
    response.audioContent || 'string',
    'binary'
  );

  const duration = await getAudioDuration(`${filename}.mp3`);

  return {
    filename,
    duration,
  };
}

async function getAudioDuration(filename: string): Promise<number> {
  util.promisify(mp3Duration);
  return mp3Duration(filename);
}
