import { ReactNode } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ScrollIcon from './ScrollIcon'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

interface Props {
  onClick: () => void
  isVisible: boolean
  direction: 'left' | 'right' | 'none'
  canScroll: boolean
}

const PROPS: Props = {
  onClick: jest.fn(),
  isVisible: true,
  direction: 'left',
  canScroll: true,
}

describe('ScrollIcon', () => {
  it('renders correctly', () => {
    renderWithTheme(<ScrollIcon {...PROPS} />)
    expect(screen.getByTestId('scroll-icon-container')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn()
    renderWithTheme(<ScrollIcon {...PROPS} onClick={onClick} />)
    fireEvent.click(screen.getByTestId('scroll-icon-container'))
    expect(onClick).toHaveBeenCalled()
  })
})
