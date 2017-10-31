import { Component } from 'react'
import PropTypes from 'prop-types'
import ReactFauxDom from 'react-faux-dom'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import cloud from 'd3-cloud'


const fill = scaleLinear()
  .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
  .range(['#bf4240', '#122336', '#14243D', '#1B3650', '#1B3E50', '#265073', '#2E638A', '#337599', '#397EAC', '#4B95C3', '#579AC7', '#6AA1CD'])


class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    font: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    fontSizeMapper: PropTypes.func,
    rotate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    width: 900,
    height: 500,
    padding: 1,
    font: 'serif',
    fontSizeMapper: word => word.value,
    rotate: 0,
  }

  componentWillMount() {
    this.wordCloud = ReactFauxDom.createElement('div')
  }

  render() {
    const {
      data,
      width,
      height,
      padding,
      font,
      fontSizeMapper,
      rotate,
    } = this.props
    const wordCounts = data.map(text => ({ ...text }))

    // clear old words
    select(this.wordCloud).selectAll('*').remove()

    // render based on new data
    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(wordCounts)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .spiral('rectangular')
      .on('end', (words) => {
        select(this.wordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .attr('viewBox', `0 0 ${layout.size()[0]} ${layout.size()[1]}`)
          .style('width', '100%')
          .style('height', 'auto')
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', font)
          .style('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text)
          .on('click', (d) => {
            window.open(d.sources[Math.floor(Math.random() * d.sources.length)].url, '_blank')
          })
      })

    layout.start()

    return this.wordCloud.toReact()
  }
}

export default WordCloud
