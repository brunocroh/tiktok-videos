import cliProgress from 'cli-progress'
import colors from 'ansi-colors'
import stream from 'stream'

async function endDownload(promise: any) {
  return new Promise((resolve, reject) => {
    promise
      .then(resolve)
      .catch(reject)
  })
}

export async function progressBar(promise: any) {
  let prevProgressNum = 0
  const progressBar = new cliProgress.SingleBar({
    format: `Downloading youtube Video | ${colors.bgRed('{bar}')} | {percentage}% | {value}/{total} Chunks`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true

  }, cliProgress.Presets.shades_classic);
  progressBar.start(100, 0)

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

  const result = await endDownload(promise)

  progressBar.update(100)
  progressBar.stop()

  return result
}
