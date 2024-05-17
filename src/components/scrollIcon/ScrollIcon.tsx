import {
  RightArrowIcon,
  LeftArrowIcon,
  ScrollIconContainer,
} from './ScrollIcon.styles'

interface Props {
  onClick: () => void
  isVisible: boolean
  direction: 'left' | 'right' | 'none'
}

const ScrollIcon = ({ onClick, isVisible, direction }: Props) => {
  if (!isVisible) return null

  return (
    <ScrollIconContainer onClick={onClick} direction={direction}>
      {direction !== 'none' && (direction === 'right' ? <RightArrowIcon /> : <LeftArrowIcon />)}
    </ScrollIconContainer>
  )
}

export default ScrollIcon
