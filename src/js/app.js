import getWords from './requests'
import wordCloud from './cloud'
import '../css/style.css'


const INTERVAL = 4000

async function createCloud(cloud) {
  let words
  try {
    words = await getWords()
  } catch (err) {
    console.log(err.message)
  }
  cloud.update(words)
  setTimeout(() => { createCloud(cloud) }, INTERVAL)
}
// Start cycle
createCloud(wordCloud('#cloud'))
