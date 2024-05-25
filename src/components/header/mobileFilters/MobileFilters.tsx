import ChartType from '../../dropDown/chartType/ChartType'
import GameType from '../../dropDown/gameType/GameType'
import { FiltersContainer } from '../Header.styles'

interface MobileFiltersProps {
  openFilters: boolean
  handleChartTypeSelect: (type: string) => void
  categories: string[]
  currentChartType: string
}

const MobileFilters = ({
  openFilters,
  handleChartTypeSelect,
  categories,
  currentChartType,
}: MobileFiltersProps) => {
  if (!openFilters) {
    return null
  }

  return (
    <FiltersContainer open={openFilters} data-testid='filters'>
      <ChartType
        options={['Table', 'Radar']}
        onSelect={handleChartTypeSelect}
        selectedOption={currentChartType}
      />
      <GameType options={categories} />
    </FiltersContainer>
  )
}

export default MobileFilters
