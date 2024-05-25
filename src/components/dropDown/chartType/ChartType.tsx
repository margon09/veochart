
import { useState, useEffect } from 'react'
import Dropdown from '../Dropdown'

interface Props {
  options: string[]
  onSelect: (selected: string) => void
  selectedOption: string
}

const ChartType = ({ options, onSelect, selectedOption }: Props) => {
  const [selected, setSelected] = useState(selectedOption)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelected(selectedOption)
  }, [selectedOption])

  const handleSelect = (option: string) => {
    setSelected(option)
    onSelect(option)
    setIsOpen(false)
  }

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <Dropdown
      options={options}
      selectedOptions={[selected]}
      onOptionChange={handleSelect}
      toggleDropdown={toggleDropdown}
      renderItem={option => <span>{option}</span>}
      renderButtonContent={() => selected}
    />
  )
}

export default ChartType
