import { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MobileFilterToggle from './MobileFilterToggle'
import { theme } from '../../../global/Theme'
import { ThemeProvider } from 'styled-components'

jest.mock('../../../svgComponents/FilterIcon', () => ({
  __esModule: true,
  default: () => <div data-testid='filter-icon' />,
}))

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('MobileFilterToggle', () => {
  const PROPS = {
    toggleFilters: jest.fn(),
  }

  it('calls toggleFilters when clicked', () => {
    renderWithTheme(<MobileFilterToggle {...PROPS} />)

    const toggleButton = screen.getByTestId('toggleBtn')
    fireEvent.click(toggleButton)

    expect(PROPS.toggleFilters).toHaveBeenCalledTimes(1)
  })

  it('renders FilterIcon', () => {
    renderWithTheme(<MobileFilterToggle {...PROPS} />)

    expect(screen.getByTestId('filter-icon')).toBeInTheDocument()
  })
})
