import { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HeaderContent from './HeaderContent'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../global/Theme'

jest.mock('../../dropDown/chartType/ChartType', () => ({
  __esModule: true,
  default: ({
    onSelect,
    selectedOption,
    options,
  }: {
    onSelect: (type: string) => void
    selectedOption: string
    options: string[]
  }) => (
    <div data-testid='chart-type-mock' onClick={() => onSelect(options[0])}>
      ChartType-{selectedOption}
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

describe('HeaderContent', () => {
  const handleChartTypeSelect = jest.fn()

  const PROPS = {
    categories: ['attacks', 'defense', 'conceded'],
    handleChartTypeSelect,
    currentChartType: 'Table',
  }

  it('renders ChartType and GameType components', () => {
    renderWithTheme(<HeaderContent {...PROPS} />)

    expect(screen.getByTestId('chart-type-mock')).toBeInTheDocument()
    expect(screen.getByTestId('game-type-mock')).toBeInTheDocument()
  })

  it('calls handleChartTypeSelect when ChartType is clicked', () => {
    renderWithTheme(<HeaderContent {...PROPS} />)

    fireEvent.click(screen.getByTestId('chart-type-mock'))

    expect(handleChartTypeSelect).toHaveBeenCalledWith('Table')
  })

  it('displays correct options in GameType component', () => {
    renderWithTheme(<HeaderContent {...PROPS} />)

    expect(screen.getByTestId('game-type-mock')).toHaveTextContent('attacks, defense, conceded')
  })
})