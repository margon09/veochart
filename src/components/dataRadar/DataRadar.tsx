import { useRef, useEffect, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { matchData } from '../../data/matchData'
import { RadialChartContainer } from './DataRadar.styles'
import debounce from 'lodash/debounce'
import useGameType from '../../hooks/useGameType'
import useWindowSize from '../../hooks/useWIndowSize'
import { filterGameTypes } from '../../utils/matchDataUtils'

const DataRadar = () => {
  const ref = useRef<SVGSVGElement>(null)
  const { selectedGameTypes } = useGameType()
  const { width, height, deviceType, isMinorMobile } = useWindowSize()

  const filteredGameTypes = useMemo(() => filterGameTypes(selectedGameTypes), [selectedGameTypes])

  const maxValues = useMemo(() => {
    return {
      maxAttacks: Math.max(...matchData.map(d => d.attacks)),
      maxDefense: Math.max(...matchData.map(d => d.defense)),
      maxConceded: Math.max(...matchData.map(d => d.conceded)),
      maxScored: Math.max(...matchData.map(d => d.scored)),
      maxCorners: Math.max(...matchData.map(d => d.corners)),
      maxFreeKicks: Math.max(...matchData.map(d => d.freeKicks)),
    }
  }, [])


  const dataValues = useMemo(() => {
    return matchData.map(d =>
      filteredGameTypes.map(type => {
        switch (type) {
          case 'attacks':
            return (d.attacks / maxValues.maxAttacks) * 100
          case 'defense':
            return (d.defense / maxValues.maxDefense) * 100
          case 'conceded':
            return (d.conceded / maxValues.maxConceded) * 100
          case 'scored':
            return (d.scored / maxValues.maxScored) * 100
          case 'corners':
            return (d.corners / maxValues.maxCorners) * 100
          case 'freeKicks':
            return (d.freeKicks / maxValues.maxFreeKicks) * 100
          case 'possession':
            return d.possession
          default:
            return 0
        }
      }),
    )
  }, [maxValues, filteredGameTypes])

  const drawChart = useCallback(
    (chartWidth: number, chartHeight: number, radius: number) => {
      const svg = d3.select(ref.current)
      const margin = { top: 20, right: 20, bottom: 80, left: 20 }
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
      const levels = 5
      const angleSlice = (Math.PI * 2) / filteredGameTypes.length
      const maxValue = 100

      const radarLine = d3
        .lineRadial<number>()
        .curve(d3.curveLinearClosed)
        .radius(d => radiusScale(d))
        .angle((d, i) => i * angleSlice)

      const radiusScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue])

      svg
        .attr('width', chartWidth + margin.left + margin.right)
        .attr('height', chartHeight + margin.top + margin.bottom)

      const g = svg
        .append('g')
        .attr(
          'transform',
          `translate(${(chartWidth + margin.left + margin.right) / 2}, ${
            (chartHeight + margin.top + margin.bottom) / 2
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

      // Axes
      const axis = g
        .selectAll('.axis')
        .data(filteredGameTypes)
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
        .text(d => d.charAt(0).toUpperCase() + d.slice(1))
        .style('font-size', '16px')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('x', (d, i) => radiusScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (d, i) => radiusScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))

      // Draw data
      dataValues.forEach((dataSet, index) => {
        g.append('path')
          .datum(dataSet)
          .attr('class', `radarArea radarArea-${index}`)
          .attr('d', radarLine)
          .style('fill', colors[index % colors.length])
          .style('fill-opacity', 0.1)
          .style('stroke-width', '2px')
          .style('stroke', colors[index % colors.length])

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

      // Color Legend
      const legendRectSize = 18
      const legendSpacing = 4

      const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr(
          'transform',
          deviceType === 'desktop'
            ? 'translate(48, 80)'
            : deviceType === 'mobile' && isMinorMobile
            ? 'translate(0, 0)'
            : 'translate(0, 65)',
        )

      const legendItems = matchData.map((match, index) => ({
        color: colors[index % colors.length],
        label: match.date,
        index,
      }))

      legendItems.forEach((item, i) => {
        const legendGroup = legend
          .append('g')
          .attr('transform', `translate(0, ${i * (legendRectSize + legendSpacing)})`)
          .attr('class', `legend-item legend-item-${item.index}`)
          .style('cursor', 'pointer')
          .on('mouseover', function () {
            d3.select(`.radarArea-${item.index}`).style('fill-opacity', 0.5).raise()
          })
          .on('mouseout', function () {
            d3.select(`.radarArea-${item.index}`).style('fill-opacity', 0.1)
          })

        legendGroup
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', item.color)

        legendGroup
          .append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize / 1.5)
          .text(item.label)
          .style('font-size', '14px')
          .attr('text-anchor', 'start')
      })
    },
    [dataValues, deviceType, isMinorMobile, filteredGameTypes],
  )

  useEffect(() => {
    const resize = debounce(() => {
      const availableWidth = width - 32
      const availableHeight = height - 32
      const chartSize = Math.min(availableWidth, availableHeight)
      const radius = chartSize / 2.5

      d3.select(ref.current).selectAll('*').remove()
      drawChart(availableWidth, availableHeight, radius)
    }, 300)

    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      resize.cancel()
    }
  }, [width, height, drawChart])

  return (
    <RadialChartContainer>
      <svg ref={ref}></svg>
    </RadialChartContainer>
  )
}

export default DataRadar
