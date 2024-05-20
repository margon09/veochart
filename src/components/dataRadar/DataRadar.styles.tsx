import styled from 'styled-components'

export const RadialChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 599px) {
    height: 500px;
    margin-top: 0;
    padding: 0;
  }

  @media (min-width: 600px) and (max-width: 1199px) {
    height: 600px;
  }

  @media (min-width: 1200px) {
    height: 700px;
  }
`
