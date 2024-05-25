import { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MobileFilters from './MobileFilters'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../global/Theme'

jest.mock('../../dropDown/chartType/ChartType', () => ({
  __esModule: true,
  default: ({
    onSelect,
    selectedOption,
  }: {
    onSelect: (option: string) => void
    selectedOption: string
  }) => (
    <div data-testid='chart-type-mock' onClick={() => onSelect(selectedOption)}>
      ChartType
    </div>
  ),
}))

jest.mock('../../dropDown/gameType/GameType', () => ({
  __esModule: true,
  default: ({ options }: { options: string[] }) => (
    <div data-testid='game-type-mock'>{options.join(', ')}</div>
  ),
}))

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('MobileFilters', () => {
  const PROPS = {
    openFilters: true,
    handleChartTypeSelect: jest.fn(),
    categories: ['Category1', 'Category2', 'Category3'],
    currentChartType: 'Radar',
  }

  it('renders ChartType and GameType when openFilters is true', () => {
    renderWithTheme(<MobileFilters {...PROPS} />)

    expect(screen.getByTestId('filters')).toBeInTheDocument()
    expect(screen.getByTestId('chart-type-mock')).toBeInTheDocument()
    expect(screen.getByTestId('game-type-mock')).toBeInTheDocument()
  })

  it('does not render filters when openFilters is false', () => {
    renderWithTheme(<MobileFilters {...PROPS} openFilters={false} />)

    expect(screen.queryByTestId('filters')).not.toBeInTheDocument()
  })

  it('calls handleChartTypeSelect with the selected option when ChartType is clicked', () => {
    renderWithTheme(<MobileFilters {...PROPS} />)

    fireEvent.click(screen.getByTestId('chart-type-mock'))

    expect(PROPS.handleChartTypeSelect).toHaveBeenCalledWith(PROPS.currentChartType)
  })
})
