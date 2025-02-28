import { getRandomInt } from '../utils.js';
import ffmpeg from 'fluent-ffmpeg';
import NotifyMe from 'notify-me';
const CWD = process.cwd();
async function getMetadata(video) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(video, (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
}
export async function createVideo(props) {
    const { audios } = props;
    const file = await createVideoBase({ ...props, audios });
    let _video = ffmpeg(file);
    _video = audios.reduce((v, a) => {
        return v.input(`${a.filename}.png`);
    }, _video);
    _video
        .complexFilter(audios.map((audio, i) => ({
        filter: 'overlay',
        scale: '1:1',
        inputs: `${!i ? '[0:v]' : '[tmp]'}[${i + 1}:v]`,
        outputs: 'tmp',
        options: {
            enable: `between(t, ${audio.startTime}, ${audio.startTime + audio.duration})`,
        },
    })), 'tmp')
        .on('end', () => {
        console.log('terminou tudo');
    })
        .outputOptions(['-map 0:a'])
        .output(`${CWD}/output/teste-final.mp4`)
        .run();
    return _video;
}
async function createVideoBase(props) {
    const { duration, audios } = props;
    const video = `${CWD}/videos/city/snowfall.mp4`;
    const metadata = await getMetadata(video);
    if (!metadata.format.duration)
        throw new Error(`Fail to get metadata of video: ${video}`);
    const startTime = getRandomInt(0, metadata.format.duration - duration);
    const { width, height } = metadata.streams[0];
    if (!width || !height)
        throw new Error('width or height not exists on metadata of video');
    const x = width - (1080 / 1920) * height;
    console.log({ w: width - x, height });
    const audioFilename = await concatAudioFiles(audios);
    return new Promise((resolve, reject) => {
        try {
            const stagingVideo = ffmpeg(video)
                .inputOption(`-ss ${startTime}`)
                .inputOption(`-t ${duration}`)
                .audioFilters([
                {
                    filter: 'volume',
                    options: {
                        volume: 0.8,
                    },
                },
            ])
                .addInput(audioFilename)
                .addOptions(['-map 0:v', '-map 1:a'])
                .videoFilters([`crop=${width - x}:${height}`])
                // .size(`${width}x${height}`)
                .on('end', () => {
                resolve(`${CWD}/output/teste.mp4`);
            })
                .saveToFile(`${CWD}/output/teste.mp4`);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
function concatAudioFiles(audios) {
    return new Promise((resolve) => {
        const ffAudios = ffmpeg(`${audios[0].filename}.mp3`);
        for (let i = 1; i < audios.length; i++) {
            ffAudios.input(`${audios[i].filename}.mp3`);
        }
        ffAudios
            .noVideo()
            .mergeToFile(`${CWD}/output/tmp.mp3`, `${CWD}/output/`)
            .output(`${CWD}/output/teste.mp3`)
            .on('end', () => resolve(`${CWD}/output/teste.mp3`))
            .run();
    });
}
export async function getAudioFromVideo(fileName) {
    return new Promise((res, rej) => {
        const baseFileName = fileName.split('.')[0];
        const newFileName = `${baseFileName}.mp3`;
        console.log({ newFileName });
        ffmpeg(fileName)
            .noVideo()
            .format('mp3')
            .output(newFileName)
            .on('error', (error) => {
            rej(error);
        })
            .on('end', () => {
            NotifyMe.notify('teste', 'teste');
            res(newFileName);
        })
            .run();
    });
}
export async function convertVideoToMp4(fileName) {
    return new Promise((res, rej) => {
        const baseFileName = fileName.split('.')[0];
        const newFileName = `${baseFileName}.mp4`;
        console.log({ newFileName });
        ffmpeg(fileName)
            .format('mp4')
            .output(newFileName)
            .on('error', (error) => {
            rej(error);
        })
            .on('end', () => {
            res(newFileName);
        })
            .run();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mZm1wZWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLE1BQXNDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUVqQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFjMUIsS0FBSyxVQUFVLFdBQVcsQ0FBQyxLQUFhO0lBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBaUIsRUFBRSxFQUFFO1lBQy9DLElBQUksR0FBRztnQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBdUI7SUFDdkQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLGVBQWUsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFekQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQVEsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsRUFBRSxNQUFN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