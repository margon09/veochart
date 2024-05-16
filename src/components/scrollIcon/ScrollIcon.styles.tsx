import styled from 'styled-components'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

interface ScrollIconContainerProps {
  direction: 'left' | 'right' | 'none'
}

export const ScrollIconContainer = styled.div<ScrollIconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const BallIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BallIconStyled = styled.div`
  width: 66px;
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.35;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const RightArrowIcon = styled(RiArrowRightSLine)`
  position: absolute;
  left: 25px;
  font-size: 36px;
`

export const LeftArrowIcon = styled(RiArrowLeftSLine)`
  position: absolute;
  right: 25px;
  font-size: 36px;
`
