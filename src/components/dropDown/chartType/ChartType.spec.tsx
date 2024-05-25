import { render, screen, fireEvent } from '@testing-library/react'
import ChartType from './ChartType'
import { theme } from '../../../global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('ChartType', () => {
  const onSelect = jest.fn()
  const options = ['Table', 'Radar']
  const selectedOption = 'Table'

  const PROPS = {
    options,
    onSelect,
    selectedOption,
  }

  it('renders the dropdown with the correct selected option', () => {
    renderWithTheme(<ChartType {...PROPS} />)
    expect(screen.getByText(selectedOption)).toBeInTheDocument()
  })

  it('toggles the dropdown list when button is clicked', () => {
    renderWithTheme(<ChartType {...PROPS} />)

    expect(screen.queryByText('Radar')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText(selectedOption))
    expect(screen.getByText('Radar')).toBeInTheDocument()
  })

  it('calls onSelect and closes the dropdown when an item is clicked', () => {
    renderWithTheme(<ChartType {...PROPS} />)

    fireEvent.click(screen.getByText(selectedOption))
    fireEvent.click(screen.getByText('Radar'))

    expect(onSelect).toHaveBeenCalledWith('Radar')
    expect(screen.getByText('Radar')).toBeInTheDocument()
  })

  it('updates the selected option when props change', () => {
    const { rerender } = renderWithTheme(<ChartType {...PROPS} />)

    expect(screen.getByText('Table')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <ChartType {...PROPS} selectedOption='Radar' />
      </ThemeProvider>,
    )

    expect(screen.getByText('Radar')).toBeInTheDocument()
  })
})
