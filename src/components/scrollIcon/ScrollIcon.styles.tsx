import styled from 'styled-components'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

interface ScrollIconContainerProps {
  direction: 'left' | 'right' | 'none'
  $canScroll: boolean
}

export const ScrollIconContainer = styled.div<ScrollIconContainerProps>`
  width: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: ${({ $canScroll }) => ($canScroll ? 0.7 : 0.2)};
  z-index: 10;
`

export const RightArrowIcon = styled(RiArrowRightSLine)`
  position: absolute;
  left: 10px;
  font-size: 36px;
  fill: ${({ theme }) => theme.colors.arrowColor};
`

export const LeftArrowIcon = styled(RiArrowLeftSLine)`
  position: absolute;
  right: 10px;
  font-size: 36px;
  fill: ${({ theme }) => theme.colors.arrowColor};
`
