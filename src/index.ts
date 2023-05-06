import cliProgress from 'cli-progress'
import createLogger from 'progress-estimator'
import youtubedl from 'youtube-dl-exec'
import fs from 'fs'
import stream from 'stream'

const POKEMON_VIDEO = 'https://www.youtube.com/watch?v=-PlAg8R9TG4'
const SNOW_VIDEO = 'https://youtu.be/ADDFmfOeihU'
const REGEX = /^.*?(\d{1,3})(?=\s|%).*$/i

async function getVideo() {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(100, 0)
  const logger = createLogger()
  const promise = youtubedl.exec(POKEMON_VIDEO, {
    writeInfoJson: true,
  })

  const stdoutStream = new stream.PassThrough();

  promise?.stdout?.pipe(stdoutStream)
  promise?.stdout?.on('data', () => {
    try {
      const output = stdoutStream.read().toString()
      if (output) {
        const str = output.split(' ')
        if (str) {
          console.log({
            v: str[1],
            s: str[1].slice(0, -1),
            n: Number(str[1].slice(0, -1))
          })
          const num = Number(str[1].slice(0, -1))
          console.log({ num })
          if (Number.isInteger(num)) {
            progressBar.update(Math.round(num))
          }
        }
      }
    } catch(err) {
      console.error(err)
    }
  })

  //const result = await logger(promise, `Downloading the video`)
  // console.log(result)
}

getVideo()
