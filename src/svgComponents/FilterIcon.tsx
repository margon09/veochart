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
          fill: '#001a63',
          opacity: opened ? 0.7 : 0.3,
        }}
        onClick={handleIconClick}
      />
    </div>
  )
}

export default FilterIcon
