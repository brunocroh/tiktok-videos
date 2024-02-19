import textoToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import mp3Duration from 'mp3-duration';
const client = new textoToSpeech.TextToSpeechClient();
export async function createAudio(text, filename) {
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
    await writeFile(`${filename}.mp3`, response.audioContent || 'string', 'binary');
    const duration = await getAudioDuration(`${filename}.mp3`);
    return {
        filename,
        duration,
    };
}
async function getAudioDuration(filename) {
    util.promisify(mp3Duration);
    return mp3Duration(filename);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC10by1zcGVlY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RleHQtdG8tc3BlZWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUNwQixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxXQUFXLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFFdEQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsSUFBWSxFQUFFLFFBQWdCO0lBQzlELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUU7OztNQUdOLElBQUk7OztDQUdUO1NBQ0k7UUFDRCxLQUFLLEVBQUU7WUFDTCxZQUFZLEVBQUUsT0FBTztZQUNyQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFVBQVUsRUFBRSxNQUFNO1NBQ25CO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsYUFBYSxFQUFFLEtBQUs7U0FDckI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxNQUFNLFNBQVMsQ0FDYixHQUFHLFFBQVEsTUFBTSxFQUNqQixRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsRUFDakMsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLGdCQUFnQixDQUFDLEdBQUcsUUFBUSxNQUFNLENBQUMsQ0FBQztJQUUzRCxPQUFPO1FBQ0wsUUFBUTtRQUNSLFFBQVE7S0FDVCxDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxRQUFnQjtJQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLENBQUMifQ==