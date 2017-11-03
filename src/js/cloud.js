import d3cloud from 'd3-cloud'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import {} from 'd3-transition'

function wordCloud(selector) {
  const width = window.innerWidth
  const height = window.innerHeight - 120
  const padding = 5
  const fill = scaleLinear()
    .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
    .range(['#bf4240', '#122336', '#14243D', '#1B3650', '#1B3E50', '#265073', '#2E638A', '#337599', '#397EAC', '#4B95C3', '#579AC7', '#6AA1CD'])
  // Construct the word cloud's SVG element
  const svg = select(selector).append('svg')
    .attr('class', 'word-cloud')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%')
    .style('height', 'auto')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)


  // Draw the word cloud
  function draw(words) {
    const cloud = svg.selectAll('g text')
      .data(words, d => d.text)

    // Entering words
    cloud.enter()
      .append('text')
      .style('font-family', 'Quicksand')
      .style('fill', (d, i) => fill(i))
      .attr('text-anchor', 'middle')
      .attr('font-size', 0.1)
      .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .text(d => d.text)
      .on('click', (d) => {
        window.open(d.sources[Math.floor(Math.random() * d.sources.length)].url, '_blank')
      })

    // Entering and existing words
    cloud
      .transition()
      .duration(600)
      .style('font-size', d => `${d.size}px`)
      .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .style('fill-opacity', 1)

    // Exiting words
    cloud.exit()
      .transition()
      .duration(200)
      .style('fill-opacity', 1e-6)
      .attr('font-size', 1)
      .remove()
  }
  return {
    update(words) {
      d3cloud()
        .size([width, height])
        .font('Quicksand')
        .words(words)
        .padding(padding)
        .rotate(() => (Math.random() < 0.12 ? 90 : 0))
        .fontSize(d => Math.log1p(d.value) * 8)
        .spiral('rectangular')
        .on('end', draw)
        .start()
    },
  }
}

export default wordCloud
