import FilterIcon from '../../svgComponents/FilterIcon'
import { FilterContainer } from './Header.styles'

interface MobileFilterToggleProps {
  toggleFilters: () => void
}

const MobileFilterToggle = ({ toggleFilters }: MobileFilterToggleProps) => (
  <FilterContainer onClick={toggleFilters}>
    <FilterIcon />
  </FilterContainer>
)
export default MobileFilterToggle
