import { useMemo } from 'react'
import Dropdown from '../Dropdown'
import { Checkbox, CheckboxContainer } from '../Dropdown.styles'
import useGameType from '../../../hooks/useGameType'
import useWindowSize from '../../../hooks/useWIndowSize'

const GameType = ({ options }: { options: string[] }) => {
  const { width } = useWindowSize()
  const isMobile = width < 599

  const { selectedGameTypes, setSelectedGameTypes } = useGameType()

  const allOptions = useMemo(() => ['Select all', ...options], [options])

  const handleOptionChange = (option: string) => {
    let newSelectedOptions: string[] = []
    if (option === 'Select all') {
      if (selectedGameTypes.includes('Select all')) {
        newSelectedOptions = []
      } else {
        newSelectedOptions = allOptions
      }
    } else {
      if (selectedGameTypes.includes(option)) {
        newSelectedOptions = selectedGameTypes.filter(o => o !== option && o !== 'Select all')
      } else {
        newSelectedOptions = [...selectedGameTypes, option]
      }

      if (newSelectedOptions.length === options.length) {
        newSelectedOptions.push('Select all')
      }
    }

    setSelectedGameTypes(newSelectedOptions)
  }

  const renderButtonContent = () => {
    return isMobile ? 'Plays' : 'Select plays'
  }

  return (
    <>
      <Dropdown
        options={allOptions}
        selectedOptions={selectedGameTypes}
        onOptionChange={handleOptionChange}
        renderItem={(option, isSelected, onSelect) => (
          <CheckboxContainer onClick={e => e.stopPropagation()}>
            <Checkbox type='checkbox' checked={isSelected} onChange={() => onSelect(option)} />
            <span>{option}</span>
          </CheckboxContainer>
        )}
        renderButtonContent={renderButtonContent}
      />
    </>
  )
}

export default GameType
