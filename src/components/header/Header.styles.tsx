import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const GoalContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.phone} {
    display: none;
  }
`
