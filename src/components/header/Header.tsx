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
import { getMatchDataCategories } from '../../utils/matchDataUtils'

const Header = () => {
  const { deviceType } = useWindowSize()
  const { handleIconClick, canScrollLeft, canScrollRight, resetScroll } = useScrollContext()
  const { setChartType, chartType } = useChartType()

  const [openFilters, setOpenFilters] = useState(false)

  const categories = getMatchDataCategories(matchData)

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

        {deviceType === 'desktop' && (
          <HeaderContent
            categories={categories}
            handleChartTypeSelect={handleChartTypeSelect}
            currentChartType={chartType}
          />
        )}
        {(deviceType === 'mobile' || deviceType === 'ipad') && (
          <MobileFilterToggle toggleFilters={toggleFilters} />
        )}
      </HeaderContainer>

      {(deviceType === 'mobile' || deviceType === 'ipad') && (
        <MobileFilters
          openFilters={openFilters}
          handleChartTypeSelect={handleChartTypeSelect}
          categories={categories}
          currentChartType={chartType}
        />
      )}

      {deviceType === 'mobile' && chartType === 'Table' && (
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
