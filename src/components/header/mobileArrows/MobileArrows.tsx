import ScrollIcon from '../../scrollIcon/ScrollIcon'
import { ArrowContainer } from '../Header.styles'

interface MobileArrowsProps {
  handleIconClick: (direction: 'left' | 'right') => void
  canScrollLeft: boolean
  canScrollRight: boolean
}

const MobileArrows = ({ handleIconClick, canScrollLeft, canScrollRight }: MobileArrowsProps) => (
  <ArrowContainer data-testid='mobile-arrows-mock'>
    <ScrollIcon
      onClick={() => handleIconClick('left')}
      isVisible
      direction='left'
      canScroll={canScrollLeft}
    />
    <ScrollIcon
      onClick={() => handleIconClick('right')}
      isVisible
      direction='right'
      canScroll={canScrollRight}
    />
  </ArrowContainer>
)
export default MobileArrows
