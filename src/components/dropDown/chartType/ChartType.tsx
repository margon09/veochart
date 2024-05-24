import { useState } from 'react'
import Dropdown from '../Dropdown'

interface Props {
  options: string[]
  onSelect: (selected: string) => void
}

const ChartType = ({ options, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  const toggleDropdown = () =>setIsOpen(!isOpen)

  return (
    <Dropdown
      options={options}
      selectedOptions={[selectedOption]}
      onOptionChange={handleSelect}
      toggleDropdown={toggleDropdown}
      renderItem={(option) => <span>{option}</span>}
      renderButtonContent={() => selectedOption}
    />
  )
}
export default ChartType
