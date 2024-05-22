import styled from 'styled-components'

interface HeaderContainerProps {
  open: boolean
}

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const FiltersContainer = styled.div<HeaderContainerProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1.5rem;

  height: ${({ open }) => (open ? '7rem' : '0')};
  transition: height 0.7s ease-in-out;
  
  ${({ theme }) => theme.mediaQueries.phone} {
    margin-top: 3rem;
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
  
  ${({ theme }) => theme.mediaQueries.phone} {
    height: 4rem;
    position: absolute; 
    top: 1rem;
    left: 3rem;
  }

  svg {
    width: 80%;
    height: 80%;
  }

  img {
    height: 110%;
  }
`
export const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 50%;
  width: 100%;
  left: 0;
`
