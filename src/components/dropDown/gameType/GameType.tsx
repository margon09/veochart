import { useState } from 'react'
import Dropdown from '../Dropdown'
import { Checkbox, CheckboxContainer } from '../Dropdown.styles'
import useWindowSize from '../../../hooks/useWIndowSize'

const GameType = ({ options }: { options: string[] }) => {
  const { width } = useWindowSize()
  const isMobile = width < 599

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionChange = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(o => o !== option)
      : [...selectedOptions, option]
    setSelectedOptions(newSelectedOptions)
  }

  const renderButtonContent = () => {
    if (selectedOptions.length === 0) {
      return isMobile ? 'Plays' : 'Select plays'
    } else if (isMobile) {
      return selectedOptions.length > 1 ? `${selectedOptions[0]}...` : selectedOptions[0]
    } else {
      return selectedOptions.length > 2
        ? `${selectedOptions.slice(0, 2).join(', ')}...`
        : selectedOptions.join(', ')
    }
  }

  return (
    <Dropdown
      options={options}
      selectedOptions={selectedOptions}
      onOptionChange={handleOptionChange}
      renderItem={(option, isSelected, onSelect) => (
        <CheckboxContainer onClick={e => e.stopPropagation()}>
          <Checkbox type='checkbox' checked={isSelected} onChange={() => onSelect(option)} />
          <span>{option}</span>
        </CheckboxContainer>
      )}
      // renderButtonContent={() => selectedOptions.join(', ') || 'Select options'}
      renderButtonContent={renderButtonContent}
    />
  )
}

export default GameType
