import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown from './Dropdown'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Dropdown', () => {
  const onOptionChange = jest.fn()
  const renderItem = jest.fn((option, isSelected, onOptionChange) => (
    <div data-testid={`item-${option}`} onClick={() => onOptionChange(option)}>
      {option} {isSelected ? '(selected)' : ''}
    </div>
  ))
  const renderButtonContent = jest.fn(() => <div data-testid='button-content'>Select</div>)

  const PROPS = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOptions: ['Option 1'],
    onOptionChange,
    renderItem,
    renderButtonContent,
  }

  it('renders the button content correctly', () => {
    renderWithTheme(<Dropdown {...PROPS} />)
    expect(screen.getByTestId('button-content')).toBeInTheDocument()
  })

  it('toggles the dropdown list when button is clicked', () => {
    renderWithTheme(<Dropdown {...PROPS} />)

    expect(screen.queryByTestId('item-Option 1')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('button-content'))
    expect(screen.getByTestId('item-Option 1')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('button-content'))
    expect(screen.queryByTestId('item-Option 1')).not.toBeInTheDocument()
  })

  it('calls onOptionChange and closes the dropdown when an item is clicked', () => {
    renderWithTheme(<Dropdown {...PROPS} />)

    fireEvent.click(screen.getByTestId('button-content'))
    fireEvent.click(screen.getByTestId('item-Option 2'))

    expect(onOptionChange).toHaveBeenCalledWith('Option 2')
    expect(screen.queryByTestId('item-Option 1')).not.toBeInTheDocument()
  })

  it('renders items with the correct selected state', () => {
    renderWithTheme(<Dropdown {...PROPS} />)

    fireEvent.click(screen.getByTestId('button-content'))

    expect(screen.getByTestId('item-Option 1')).toContainHTML('item-Option 1')
    expect(screen.getByTestId('item-Option 2')).toContainHTML('item-Option 2')
    expect(screen.getByTestId('item-Option 3')).toContainHTML('item-Option 3')
  })
})
