import styled from 'styled-components'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'

interface ScrollIconContainerProps {
  direction: 'left' | 'right' | 'none'
}

export const ScrollIconContainer = styled.div<ScrollIconContainerProps>`
  /* height: 100vh; */
  width: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: relative;

  /* margin-top: calc(100vh - 50vh + 10rem); */
`

export const RightArrowIcon = styled(RiArrowRightSLine)`
  position: absolute;
  left: 10px;
  font-size: 36px;
`

export const LeftArrowIcon = styled(RiArrowLeftSLine)`
  position: absolute;
  right: 10px;
  font-size: 36px;
`
