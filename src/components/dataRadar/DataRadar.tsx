import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { matchData } from '../../data/matchData'
import { RadialChartContainer } from './DataRadar.styles'
import useGameType from '../../hooks/useGameType'

const DataRadar = () => {
  const ref = useRef<SVGSVGElement>(null)
  const { selectedGameTypes } = useGameType()

  useEffect(() => {
    const svg = d3.select(ref.current)
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    const colors = [
      '#0f7fd0',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#dfd000',
      '#17becf',
    ]

    const resize = () => {
      const width = (ref.current?.clientWidth || 0) - margin.left - margin.right
      const height = (ref.current?.clientHeight || 0) - margin.top - margin.bottom
      const radius = Math.min(width, height) / 2
      svg.selectAll('*').remove()

      drawChart(width, height, radius)
    }

    const drawChart = (width: number, height: number, radius: number) => {
      const maxAttacks = Math.max(...matchData.map(i => i.attacks))
      const maxDefense = Math.max(...matchData.map(i => i.defense))
      const maxConceded = Math.max(...matchData.map(i => i.conceded))
      const maxScored = Math.max(...matchData.map(i => i.scored))
      const maxCorners = Math.max(...matchData.map(i => i.corners))
      const maxFreeKicks = Math.max(...matchData.map(i => i.freeKicks))

      const levels = 5
      const angleSlice = (Math.PI * 2) / selectedGameTypes.filter(k => k !== 'Select all').length
      const maxValue =
        d3.max(matchData, d =>
          Math.max(
            (d.attacks / maxAttacks) * 100,
            (d.defense / maxDefense) * 100,
            (d.conceded / maxConceded) * 100,
            (d.scored / maxScored) * 100,
            (d.corners / maxCorners) * 100,
            (d.freeKicks / maxFreeKicks) * 100,
            d.possession,
          ),
        ) ?? 0

      const radarLine = d3
        .lineRadial<number>()
        .curve(d3.curveLinearClosed)
        .radius(d => radiusScale(d))
        .angle((d, i) => i * angleSlice)

      const radiusScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue])

      svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

      const g = svg
        .append('g')
        .attr(
          'transform',
          `translate(${(width + margin.left + margin.right) / 2},${
            (height + margin.top + margin.bottom) / 2
          })`,
        )

      // Grid
      for (let i = 0; i <= levels; i++) {
        const levelFactor = radiusScale((maxValue * i) / levels)
        g.selectAll(`.levels-${i}`)
          .data([1])
          .enter()
          .append('circle')
          .attr('r', levelFactor)
          .attr('cx', 0)
          .attr('cy', 0)
          .style('fill', 'none')
          .style('stroke', '#CDCDCD')
          .style('stroke-width', '0.5px')
      }

      const axis = g
        .selectAll('.axis')
        .data(selectedGameTypes.filter(key => key !== 'Select all'))
        .enter()
        .append('g')
        .attr('class', 'axis')

      axis
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => radiusScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', (d, i) => radiusScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
        .style('stroke', 'grey')
        .style('stroke-width', '1px')

      axis
        .append('text')
        .attr('class', 'legend')
        .text(d => d)
        .style('font-size', '11px')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('x', (d, i) => radiusScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (d, i) => radiusScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))

      // Data for radar chart
      const dataValues = matchData.map(d => [
        (d.attacks / maxAttacks) * 100,
        (d.defense / maxDefense) * 100,
        (d.conceded / maxConceded) * 100,
        (d.scored / maxScored) * 100,
        (d.corners / maxCorners) * 100,
        (d.freeKicks / maxFreeKicks) * 100,
        d.possession,
      ])

      // Draw data
      dataValues.forEach((dataSet, index) => {
        g.append('path')
          .datum(dataSet)
          .attr('class', 'radarStroke')
          .attr('d', radarLine)
          .style('stroke-width', '2px')
          .style('stroke', colors[index % colors.length])
          .style('fill', 'none')

        g.selectAll(`.radarCircle-${index}`)
          .data(dataSet)
          .enter()
          .append('circle')
          .attr('r', 4)
          .attr('cx', (d, i) => radiusScale(d) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (d, i) => radiusScale(d) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', colors[index % colors.length])
          .style('fill-opacity', 0.8)
      })
    }

    // Initial draw
    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [selectedGameTypes])

  return (
    <RadialChartContainer>
      <svg ref={ref}></svg>
    </RadialChartContainer>
  )
}

export default DataRadar