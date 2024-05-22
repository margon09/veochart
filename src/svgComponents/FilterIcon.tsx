import { useState } from 'react'
import { ReactComponent as Icon } from '../assets/svg/filter-32.svg'

const FilterIcon = () => {
  const [opened, setOpened] = useState(true)

  const handleIconClick = () => {
    setOpened(!opened)
  }

  return (
    <div>
      <Icon
        style={{
          width: '1.9rem',
          marginLeft: '8px',
          // fill: '#001a63',
          fill: '#FFF',
          // opacity: opened ? 0.7 : 0.3,
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
