import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { theme } from './global/Theme'
import useChartType from './hooks/useChartType'

jest.mock('./hooks/useChartType')
jest.mock('./components/header/Header', () => ({
  __esModule: true,
  default: () => <div data-testid='headerComponent'>Header</div>
}))
jest.mock('./components/dataTable/DataTable', () => ({
  __esModule: true,
  default: () => <div data-testid='tableComponent'>DataTable</div>
}))
jest.mock('./components/dataRadar/DataRadar', () => ({
  __esModule: true,
  default: () => <div data-testid='data-radar-mock'>DataRadar</div>
}))

const renderWithTheme = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('App', () => {
  const setChartType = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders Header and DataTable when chartType is "Table"', () => {
    jest.mocked(useChartType).mockReturnValue({ chartType: 'Table', setChartType })

    renderWithTheme(<App />)

    const headerMock = screen.getByTestId('headerComponent')
    const dataTableMock = screen.getByTestId('tableComponent')

    expect(headerMock).toBeInTheDocument()
    expect(dataTableMock).toBeInTheDocument()
    expect(screen.queryByTestId('data-radar-mock')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })

  it('renders Header and LazyDataRadar when chartType is "Radar"', async () => {
    jest.mocked(useChartType).mockReturnValue({ chartType: 'Radar', setChartType })

    renderWithTheme(<App />)

    const headerMock = screen.getByTestId('headerComponent')
    const loadingSpinner = screen.getByTestId('loading-spinner')

    expect(headerMock).toBeInTheDocument()
    expect(screen.queryByTestId('tableComponent')).not.toBeInTheDocument()
    expect(loadingSpinner).toBeInTheDocument()

    const lazyDataRadar = await screen.findByTestId('data-radar-mock')
    expect(lazyDataRadar).toBeInTheDocument()
  })
})
