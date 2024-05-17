import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  width: 200px;

  ${({ theme }) => theme.mediaQueries.phone} {
    min-width: 130px;
  }
`

export const DropdownButton = styled.div`
  padding: 10px;
  background-color: #f2f4f5;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  margin-right: 0.5rem;
`

export const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;

  ${({ theme }) => theme.mediaQueries.phone} {
    width: calc(100% - 0.5rem);
  }
`

export const DropdownListItem = styled.li`
  list-style: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  accent-color: #0023ae;
`

export const CheckboxLabel = styled.span`
  font-size: 16px;
  color: #333;
  user-select: none;
`
