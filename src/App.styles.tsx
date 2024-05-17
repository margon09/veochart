import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.mediaQueries.phone} {
    padding-top: 20px;
  }
`
