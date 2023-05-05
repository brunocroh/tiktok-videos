const logger = require('progress-estimator')()
const youtubedl = require('youtube-dl-exec')


async function getVideo() {
  const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
  const promise = youtubedl(url, { dumpSingleJson: true })
  const result = await logger(promise, `Obtaining ${url}`)

  console.log(result)
}

getVideo()
