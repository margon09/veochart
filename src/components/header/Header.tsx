import useWindowSize from '../../hooks/useWIndowSize'
import ScrollIcon from '../scrollIcon/ScrollIcon'
import { HeaderContainer, IconBox, ArrowContainer, FiltersContainer } from './Header.styles'
import useScrollContext from '../../hooks/useScrollContext'
import Ball from '../../svgComponents/Ball'
import Goal from '../../assets/goal.png'
import GameType from '../dropDown/gameType/GameType'
import { matchData } from '../../data/matchData'
import ChartType from '../dropDown/chartType/ChartType'
import FilterIcon from '../../svgComponents/FilterIcon'
import { useState } from 'react'
import useChartType from '../../hooks/useChartType'


const Header = () => {
  const { width } = useWindowSize()
  const isMobile = width < 599
  const isDesktop = width > 768
  const { handleIconClick } = useScrollContext()
  const { setChartType } = useChartType()

  const [openFilters, setOpenFilters] = useState(false)

  const categories = Object.keys(matchData[0]).filter(key => key !== 'date')

  const handleChartTypeSelect = (type: string) => {
    // console.log('Selected chart type:', type)
    setChartType(type)
  }

  const toggleFilters = () => setOpenFilters(!openFilters)

  return (
    <>
      <HeaderContainer>
        <IconBox>
          <Ball />
          <img src={Goal} alt='Football goal' />
        </IconBox>

        {isDesktop && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '1rem' }}>
              <ChartType options={['Table', 'Radial']} onSelect={handleChartTypeSelect} />
            </div>
            <GameType options={categories} />
          </div>
        )}
        {isMobile && (
          <>
            <div onClick={toggleFilters}>
              <FilterIcon />
            </div>
          </>
        )}
      </HeaderContainer>

      {isMobile && openFilters && (
        <FiltersContainer open={openFilters}>
          <ChartType options={['Table', 'Radar']} onSelect={handleChartTypeSelect} />
          <GameType options={categories} />
        </FiltersContainer>
      )}

      {isMobile && (
        <ArrowContainer>
          <ScrollIcon
            onClick={() => handleIconClick('left')}
            isVisible={isMobile}
            direction='left'
          />
          <ScrollIcon
            onClick={() => handleIconClick('right')}
            isVisible={isMobile}
            direction='right'
          />
        </ArrowContainer>
      )}
    </>
  )
}

export default Header
