import styled from 'styled-components'

interface FiltersContainerProps {
  open: boolean
}

export const HeaderContainer = styled.header`
  width: 100%;
  height: 6.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const FiltersContainer = styled.div<FiltersContainerProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1.5rem;
  height: ${props => (props.open ? '5rem' : '0')};
  opacity: ${props => (props.open ? '1' : '0')};
  overflow: ${props => (props.open ? 'visible' : 'hidden')};
  transition: height 0.7s ease-in-out, opacity 0.7s ease-in-out;

  ${({ theme }) => theme.mediaQueries.phone} {
    flex-direction: column;
    align-items: flex-start;

    :nth-child(1) {
      z-index: 100;
    }
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const IconBox = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 80%;
    height: 80%;
    opacity: 0.4;
  }

  img {
    width: 100%;
    height: 150%;
    opacity: 0.3;
  }
`
export const ArrowContainer = styled.div`
  width: 130%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 50%;
`
