import cliProgress from 'cli-progress'
import youtubedl from 'youtube-dl-exec'
import stream from 'stream'

const POKEMON_VIDEO = 'https://youtu.be/gutR_LNoZw0'
const SNOW_VIDEO = 'https://youtu.be/ADDFmfOeihU'
const REGEX = /^.*?(\d{1,3})(?=\s|%).*$/i

async function getVideo() {
  let prevProgressNum = 0
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(100, 0)
  const promise = youtubedl.exec(POKEMON_VIDEO, {
    writeInfoJson: true,
  })

  const stdoutStream = new stream.PassThrough();

  promise?.stdout?.pipe(stdoutStream)
  promise?.stdout?.on('data', () => {
    try {
      const output = stdoutStream.read().toString()
      if (output) {
        const match = output.match(/\b(\d{1,2}(?:\.\d{1,2})?)%/);
        const percentage = match ? match[1] : null;
        if (percentage) {
            const num = Number(percentage)
            if (Number.isInteger(num) && num > prevProgressNum) {
              progressBar.update(Math.round(num))
              prevProgressNum = num
            }
        }
      }
    } catch(err) {
      console.error(err)
    }
  })

  await endDownload(promise)

  progressBar.update(100)
  progressBar.stop()
}

async function endDownload(promise: any) {
  return new Promise((resolve, reject) => {
    promise
      .then(resolve)
      .catch(reject)
  })
}


getVideo()
