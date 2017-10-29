import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import WordCloud from './WordCloud'
import '../css/style.css'


export default class Cloud extends Component {
  constructor(props) {
    super(props)

    this.state = {
      words: [],
    }
  }
  componentDidMount() {
    axios.get('http://localhost:6060/api/v1/news')
      .then((res) => {
        const words = res.data.data
        this.setState({ words })
      })
  }

  render() {
    const font = 'Quicksand'
    const fontSizeMapper = word => Math.log2(word.value) * 5
    const rotate = () => {
      const rotation = Math.random() < 0.15 ? 90 : 0
      return rotation
    }
    return (
      <WordCloud
        data={this.state.words}
        font={font}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
      />
    )
  }
}

render(<Cloud />, document.getElementById('app'))
