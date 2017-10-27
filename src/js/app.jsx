import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
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
        console.log(words)
        this.setState({ words })
      })
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.words.map(word =>
            <li key={word.id}>{word.word}</li>)}
      </div>
    )
  }
}

render(<Cloud />, document.getElementById('app'))
