import { RightArrowIcon, LeftArrowIcon, ScrollIconContainer } from './ScrollIcon.styles'

interface Props {
  onClick: () => void
  isVisible: boolean
  direction: 'left' | 'right' | 'none'
  canScroll: boolean
}

const ScrollIcon = ({ onClick, isVisible, direction, canScroll }: Props) => {
  if (!isVisible) return null

  return (
    <ScrollIconContainer
      data-testid='scroll-icon-container'
      onClick={onClick}
      direction={direction}
      $canScroll={canScroll}
    >
      {direction !== 'none' && (direction === 'right' ? <RightArrowIcon /> : <LeftArrowIcon />)}
    </ScrollIconContainer>
  )
}

export default ScrollIcon
