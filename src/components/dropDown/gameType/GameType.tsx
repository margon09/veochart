import { useEffect, useMemo } from 'react'
import useGameType from '../../../hooks/useGameType'
import useWindowSize from '../../../hooks/useWIndowSize'
import Dropdown from '../Dropdown'
import { Checkbox, CheckboxContainer } from '../Dropdown.styles'

const GameType = ({ options }: { options: string[] }) => {
  const { width } = useWindowSize()
  const isMobile = width < 599

  const { selectedGameTypes, setSelectedGameTypes } = useGameType()

  const allOptions = useMemo(() => ['Select all', ...options], [options])

  useEffect(() => {
    setSelectedGameTypes(allOptions)
  }, [setSelectedGameTypes, allOptions])

  const handleOptionChange = (option: string) => {
    if (option === 'Select all') {
      if (selectedGameTypes.includes('Select all')) {
        setSelectedGameTypes([])
      } else {
        setSelectedGameTypes(allOptions)
      }
    } else {
      const newSelectedOptions = selectedGameTypes.includes(option)
        ? selectedGameTypes.filter(o => o !== option)
        : [...selectedGameTypes, option]

      if (newSelectedOptions.length === options.length) {
        setSelectedGameTypes(allOptions)
      } else {
        setSelectedGameTypes(newSelectedOptions.filter(o => o !== 'Select all'))
      }
    }
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
