import { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MobileArrows from './MobileArrows'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../global/Theme'

jest.mock('../../scrollIcon/ScrollIcon', () => ({
  __esModule: true,
  default: ({
    onClick,
    direction,
    canScroll,
  }: {
    onClick: () => void
    direction: string
    canScroll: boolean
  }) => (
    <div data-testid={`scroll-icon-${direction}`} onClick={onClick} data-can-scroll={canScroll}>
      ScrollIcon-{direction}
    </div>
  ),
}))

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('MobileArrows', () => {
  const handleIconClick = jest.fn()

  const PROPS = {
    handleIconClick,
    canScrollLeft: true,
    canScrollRight: true,
  }

  it('renders ScrollIcon components', () => {
    renderWithTheme(<MobileArrows {...PROPS} />)

    expect(screen.getByTestId('scroll-icon-left')).toBeInTheDocument()
    expect(screen.getByTestId('scroll-icon-right')).toBeInTheDocument()
  })

  it('calls handleIconClick with "left" when left ScrollIcon is clicked', () => {
    renderWithTheme(<MobileArrows {...PROPS} />)

    fireEvent.click(screen.getByTestId('scroll-icon-left'))

    expect(handleIconClick).toHaveBeenCalledWith('left')
  })

  it('calls handleIconClick with "right" when right ScrollIcon is clicked', () => {
    renderWithTheme(<MobileArrows {...PROPS} />)

    fireEvent.click(screen.getByTestId('scroll-icon-right'))

    expect(handleIconClick).toHaveBeenCalledWith('right')
  })

  it('checks if the canScroll prop is passed correctly to the ScrollIcon components', () => {
    renderWithTheme(<MobileArrows {...PROPS} />)

    expect(screen.getByTestId('scroll-icon-left')).toHaveAttribute('data-can-scroll', 'true')
    expect(screen.getByTestId('scroll-icon-right')).toHaveAttribute('data-can-scroll', 'true')
  })
})
