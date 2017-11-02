import axios from 'axios'


async function getWords() {
  let res
  try {
    res = await axios.get('http://localhost:6060/api/v1/news?limit=250')
  } catch (err) {
    console.log(err.message)
  }
  return res.data.data
}

export default getWords
