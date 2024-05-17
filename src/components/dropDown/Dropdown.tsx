import { useState } from 'react'
import {
  DropdownButton,
  DropdownContainer,
  DropdownList,
  DropdownListItem,
} from './Dropdown.styles'

interface Props {
  options: string[]
  selectedOptions: string[]
  onOptionChange: (option: string) => void
  renderItem: (
    option: string,
    isSelected: boolean,
    onOptionChange: (option: string) => void,
  ) => JSX.Element
  renderButtonContent: () => React.ReactNode
  toggleDropdown?: () => void
}

const Dropdown = ({
  options,
  selectedOptions,
  onOptionChange,
  renderItem,
  renderButtonContent,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{renderButtonContent()}</DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownListItem
              key={option}
              onClick={() => {
                onOptionChange(option)
                toggleDropdown()
              }}
            >
              {renderItem(option, selectedOptions.includes(option), onOptionChange)}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}

export default Dropdown
