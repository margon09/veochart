import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.phone} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    font-size: 0.8rem;
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: 0.9rem;
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    font-size: 1rem;
  }
`

export const TableHeader = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding: 8px;
  background-color: ${({ theme }) =>
    theme.colors.formBackground};

  ${({ theme }) => theme.mediaQueries.phone} {
    padding: 6px;
  }
`

export const TableCell = styled.td`
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding: 8px;

  ${({ theme }) => theme.mediaQueries.phone} {
    padding: 6px;
  }
`
