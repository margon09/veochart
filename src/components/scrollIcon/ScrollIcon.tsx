import {
  BallIconContainer,
  BallIconStyled,
  RightArrowIcon,
  LeftArrowIcon,
  ScrollIconContainer,
} from './ScrollIcon.styles'
import Ball from '../../svgComponents/Ball'

interface Props {
  onClick: () => void
  isVisible: boolean
  direction: 'left' | 'right' | 'none'
}

const ScrollIcon = ({ onClick, isVisible, direction }: Props) => {
  if (!isVisible) return null

  return (
    <ScrollIconContainer onClick={onClick} direction={direction}>
      <BallIconContainer>
        <BallIconStyled>
          <Ball />
        </BallIconStyled>
        {direction !== 'none' && (direction === 'right' ? <RightArrowIcon /> : <LeftArrowIcon />)}
      </BallIconContainer>
    </ScrollIconContainer>
  )
}

export default ScrollIcon
