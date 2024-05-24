import ChartType from '../dropDown/chartType/ChartType'
import GameType from '../dropDown/gameType/GameType'
import { FiltersContainer } from './Header.styles'

interface MobileFiltersProps {
  openFilters: boolean
  handleChartTypeSelect: (type: string) => void
  categories: string[]
}

const MobileFilters = ({ openFilters, handleChartTypeSelect, categories }: MobileFiltersProps) => {
  if (!openFilters) {
    return null
  }

  return (
    <FiltersContainer open={openFilters}>
      <ChartType options={['Table', 'Radar']} onSelect={handleChartTypeSelect} />
      <GameType options={categories} />
    </FiltersContainer>
  )
}

export default MobileFilters
