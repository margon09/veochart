import { useState } from 'react'
import { HeaderContainer, IconBox } from './Header.styles'
import useScrollContext from '../../hooks/useScrollContext'
import Ball from '../../svgComponents/Ball'
import Goal from '../../assets/goal.png'
import { matchData } from '../../data/matchData'
import useChartType from '../../hooks/useChartType'
import useWindowSize from '../../hooks/useWIndowSize'
import MobileFilters from './mobileFilters/MobileFilters'
import HeaderContent from './headerContent/HeaderContent'
import MobileArrows from './mobileArrows/MobileArrows'
import MobileFilterToggle from './mobileFilterToggle/MobileFilterToggle'

const Header = () => {
  const { width } = useWindowSize()
  const isMobile = width < 599
  const isIpad = width >= 599 && width < 769
  const isDesktop = width >= 769

  const { handleIconClick, canScrollLeft, canScrollRight, resetScroll } = useScrollContext()
  const { setChartType, chartType } = useChartType()

  const [openFilters, setOpenFilters] = useState(false)

  const categories = Object.keys(matchData[0]).filter(key => key !== 'date')

  const handleChartTypeSelect = (type: string) => {
    setChartType(type)
    resetScroll()
  }

  const toggleFilters = () => setOpenFilters(!openFilters)

  return (
    <>
      <HeaderContainer>
        <IconBox>
          <Ball />
          <img src={Goal} alt='Football goal' loading='lazy' />
        </IconBox>

        {isDesktop && (
          <HeaderContent
            categories={categories}
            handleChartTypeSelect={handleChartTypeSelect}
            currentChartType={chartType}
          />
        )}
        {(isMobile || isIpad) && <MobileFilterToggle toggleFilters={toggleFilters} />}
      </HeaderContainer>

      {(isMobile || isIpad) && (
        <MobileFilters
          openFilters={openFilters}
          handleChartTypeSelect={handleChartTypeSelect}
          categories={categories}
          currentChartType={chartType}
        />
      )}

      {isMobile && chartType === 'Table' && (
        <MobileArrows
          handleIconClick={handleIconClick}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
        />
      )}
    </>
  )
}

export default Header
