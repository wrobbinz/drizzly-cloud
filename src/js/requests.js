import axios from 'axios'


async function getWords() {
  try {
    const host = 'http://localhost:6060'
    const limit = 250
    const res = await axios.get(`${host}/api/v1/words?limit=${limit}`)
    return res.data.data
  } catch (err) {
    throw new Error('GET request to server failed')
  }
}

export default getWords
