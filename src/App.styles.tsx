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
