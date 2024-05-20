import { useState } from 'react'
import ScrollIcon from '../scrollIcon/ScrollIcon'
import { HeaderContainer, IconBox, ArrowContainer, FiltersContainer } from './Header.styles'
import useScrollContext from '../../hooks/useScrollContext'
import Ball from '../../svgComponents/Ball'
import Goal from '../../assets/goal.png'
import GameType from '../dropDown/gameType/GameType'
import { matchData } from '../../data/matchData'
import ChartType from '../dropDown/chartType/ChartType'
import FilterIcon from '../../svgComponents/FilterIcon'
import useChartType from '../../hooks/useChartType'
import useWindowSize from '../../hooks/useWIndowSize'

const Header = () => {
  const { width } = useWindowSize()
  const isMobile = width < 599
  const isIpad = width >= 599 && width < 768
  const isDesktop = width >= 768
  
  const { handleIconClick, canScrollLeft, canScrollRight } = useScrollContext()
  const { setChartType, chartType } = useChartType()

  const [openFilters, setOpenFilters] = useState(false)

  const categories = Object.keys(matchData[0]).filter(key => key !== 'date')

  const handleChartTypeSelect = (type: string) => {
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
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '1rem'}}>
              <ChartType options={['Table', 'Radial']} onSelect={handleChartTypeSelect} />
            </div>
            <GameType options={categories} />
          </div>
        )}
        {(isMobile || isIpad) && (
          <div onClick={toggleFilters}>
            <FilterIcon />
          </div>
        )}
      </HeaderContainer>

      {(isMobile || isIpad) && openFilters && (
        <FiltersContainer open={openFilters}>
          <ChartType options={['Table', 'Radar']} onSelect={handleChartTypeSelect} />
          <GameType options={categories} />
        </FiltersContainer>
      )}

      {(isMobile && chartType === 'Table') && (
        <ArrowContainer>
          <ScrollIcon
            onClick={() => handleIconClick('left')}
            isVisible={isMobile}
            direction='left'
            canScroll={canScrollLeft}
          />
          <ScrollIcon
            onClick={() => handleIconClick('right')}
            isVisible={isMobile}
            direction='right'
            canScroll={canScrollRight}
          />
        </ArrowContainer>
      )}
    </>
  )
}

export default Header
