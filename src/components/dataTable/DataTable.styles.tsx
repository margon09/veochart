import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    margin-top: 2rem;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    margin-top: 1rem;
  }
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  font-size: 1rem;

  thead {
    font-family: Arial, sans-serif;
    font-size: 1rem;
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    margin-top: 0.5rem;
    font-size: 0.75rem;

    thead {
      font-size: 0.95rem;
    }
  }
`

export const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  color: ${({ theme }) => theme.colors.headerColor};
  border: 1px solid ${({ theme }) => theme.colors.borders};
  background-color: ${({ theme }) => theme.colors.header};

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
