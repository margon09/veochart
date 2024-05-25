import { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'
import useWindowSize from '../../hooks/useWIndowSize'

jest.mock('../../hooks/useScrollContext', () => () => ({
  handleIconClick: jest.fn(),
  canScrollLeft: true,
  canScrollRight: true,
  resetScroll: jest.fn(),
}))
jest.mock('../../hooks/useChartType', () => () => ({
  setChartType: jest.fn(),
  chartType: 'Table',
}))
jest.mock('../../hooks/useWindowSize')

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Header', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders HeaderContent on desktop', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 1280,
      height: 720,
    }))
    renderWithTheme(<Header />)
    expect(screen.getByTestId('header-content-mock')).toBeInTheDocument()
  })

  it('renders MobileArrows on mobile when chartType is Table', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 400,
      height: 700,
    }))

    jest.mock('../../hooks/useChartType', () => () => ({
      chartType: 'Table',
    }))

    renderWithTheme(<Header />)
    expect(screen.getByTestId('mobile-arrows-mock')).toBeInTheDocument()
  })

  it('renders MobileFilterToggle on mobile or iPad', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 414,
      height: 896,
    }))

    renderWithTheme(<Header />)

    expect(screen.getByTestId('toggleBtn')).toBeInTheDocument()
  })

  it('renders MobileFilters on mobile or iPad when openFilters is true', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 414,
      height: 896,
    }))

    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest.fn(() => [true, jest.fn()]),
    }))

    renderWithTheme(<Header />)
    expect(screen.getByTestId('toggleBtn')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('toggleBtn'))

    expect(screen.getByTestId('filters')).toBeInTheDocument()
  })
})
