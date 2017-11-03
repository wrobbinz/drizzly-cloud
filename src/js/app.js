import getWords from './requests'
import wordCloud from './cloud'
import '../css/style.css'


const INTERVAL = 4000

async function createCloud(cloud) {
  try {
    cloud.update(await getWords())
    setTimeout(() => {
      createCloud(cloud)
    }, INTERVAL)
  } catch (err) {
    throw new Error('Failed to create the cloud...')
  }
}
// Start cycle
createCloud(wordCloud('#cloud'))
