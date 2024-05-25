import styled from 'styled-components'

export const RadialChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  svg {
    width: 100%;
    height: calc(100vh - 3rem);
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;

    ${({ theme }) => theme.mediaQueries.phone} {
      height: calc(100vh - 2rem);
    }
    @media (max-width: 375px) and (max-height: 740px) {
      height: calc(100vh - 100px);
    }
  }
`
