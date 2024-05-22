import styled from 'styled-components'

export const Container = styled.div`
  height: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.mediaQueries.phone} {
    padding-top: 2rem;
  }
`


export const SpinnerContainer = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.colors.activeInput};
    font-size: 4rem;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

`
