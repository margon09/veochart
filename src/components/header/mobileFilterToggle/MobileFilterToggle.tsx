import FilterIcon from '../../../svgComponents/FilterIcon'
import { FilterContainer } from '../Header.styles'

interface MobileFilterToggleProps {
  toggleFilters: () => void
}

const MobileFilterToggle = ({ toggleFilters }: MobileFilterToggleProps) => (
  <FilterContainer data-testid='toggleBtn' onClick={toggleFilters}>
    <FilterIcon />
  </FilterContainer>
)
export default MobileFilterToggle
