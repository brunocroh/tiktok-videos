import textoToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import util from 'util'

const client = new textoToSpeech.TextToSpeechClient()

export async function createAudio(text: string, filename: string) {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'pt-BR', name: 'pt-BR-wavenet-B', ssmlGender: 'MALE' },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  })

  const writeFile = util.promisify(fs.writeFile)
  await writeFile(`./${filename}.mp3`, response.audioContent || 'string', 'binary')
}
