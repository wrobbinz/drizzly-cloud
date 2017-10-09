import React, { Component } from 'react'
import { render } from 'react-dom'

import '../css/style.css'
import cloudImage from '../assets/cloud.png'

export default class Cloud extends Component {
  render() {
    return (
      <div>
        Drizzly News
        <img src={cloudImage} alt="cloud" />
      </div>
    )
  }
}

render(<Cloud />, document.getElementById('app'))
