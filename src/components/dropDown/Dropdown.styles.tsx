import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  width: 200px;

  ${({ theme }) => theme.mediaQueries.phone} {
    width: 100%;
    margin-bottom: 1rem;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    width: 100%;
    margin-bottom: 1rem;
  }
`

export const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borders};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  `

export const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  font-family: Helvetica, sans-serif;
  z-index: 99 !important;
`

export const DropdownList = styled.ul`
  position: absolute;
  width: 99.2%;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding: 0;
  margin: 0;
  box-shadow: 0px 8px 16px 0px ${({ theme }) => theme.boxShadow};

  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
`

export const DropdownListItem = styled.li`
  list-style: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.header};
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* color: #333743; */
`

export const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.checkBox};
`
