import { useState } from 'react'
import { ReactComponent as Icon } from '../assets/svg/filter-32.svg'
import useWindowSize from '../hooks/useWIndowSize'

const FilterIcon = () => {
  const { width } = useWindowSize()
  const isIpad = width >= 599 && width < 769

  const [opened, setOpened] = useState(true)

  const handleIconClick = () => {
    setOpened(!opened)
  }

  return (
    <div>
      <Icon
        style={{
          width: isIpad ? '2.7rem' : '1.9rem',
          marginLeft: '8px',
          fill: '#FFF',
          opacity: opened ? 1 : 0.5,
          position: 'absolute',
          top: '2rem',
          right: '3rem',
        }}
        onClick={handleIconClick}
      />
    </div>
  )
}

export default FilterIcon
