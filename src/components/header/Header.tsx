import useWindowSize from '../../hooks/useWIndowSize'
import ScrollIcon from '../scrollIcon/ScrollIcon'
import { GoalContainer, HeaderContainer } from './Header.styles'
import Goal from '../../svgComponents/Goal'
import useScrollContext from '../../hooks/useScrollContext'

const Header = () => {
  const { width } = useWindowSize()
  const isMobile = width < 599
  const { handleIconClick } = useScrollContext()

  return (
    <HeaderContainer>
      {isMobile ? (
        <>
          <ScrollIcon
            onClick={() => handleIconClick('left')}
            isVisible={isMobile}
            direction='left'
          />
          <ScrollIcon
            onClick={() => handleIconClick('right')}
            isVisible={isMobile}
            direction='right'
          />
        </>
      ) : (
        <>
          <ScrollIcon
            onClick={() => handleIconClick('none')}
            isVisible={!isMobile}
            direction='none'
          />
          <GoalContainer>
            <Goal />
          </GoalContainer>
        </>
      )}
    </HeaderContainer>
  )
}

export default Header
