import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GameType from './GameType'
import { theme } from '../../../global/Theme'
import { ThemeProvider } from 'styled-components'
import useGameType from '../../../hooks/useGameType'
import useWindowSize from '../../../hooks/useWIndowSize'

const renderWithTheme = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

jest.mock('../../../hooks/useGameType')
jest.mock('../../../hooks/useWindowSize')

describe('GameType', () => {
  const setSelectedGameTypes = jest.fn()
  const useGameTypeMock = {
    selectedGameTypes: [],
    setSelectedGameTypes,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(useGameType).mockReturnValue(useGameTypeMock)
    jest.mocked(useWindowSize).mockReturnValue({
      width: 1280,
      height: 720,
      deviceType: 'desktop',
    })
  })

  const PROPS = {
    options: ['Option 1', 'Option 2', 'Option 3'],
  }

  it('renders the button content correctly', () => {
    renderWithTheme(<GameType {...PROPS} />)
    expect(screen.getByText('Select plays')).toBeInTheDocument()
  })

  it('toggles the dropdown list when button is clicked', () => {
    renderWithTheme(<GameType {...PROPS} />)

    fireEvent.click(screen.getByText('Select plays'))
    expect(screen.getByText('Option 1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Select plays'))
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('renders button content correctly for mobile view', () => {
    jest.mocked(useWindowSize).mockReturnValue({
      width: 400,
      height: 800,
      deviceType: 'mobile'
    })
    renderWithTheme(<GameType {...PROPS} />)
    expect(screen.getByText('Plays')).toBeInTheDocument()
  })

  it('selects all options when "Select all" is clicked', async () => {
    jest.mocked(useGameType).mockReturnValue({
      selectedGameTypes: [],
      setSelectedGameTypes,
    })

    renderWithTheme(<GameType {...PROPS} />)

    fireEvent.click(screen.getByText('Select plays'))
    fireEvent.click(screen.getByTestId('item-Select all'))

    await waitFor(() => {
      expect(setSelectedGameTypes).toHaveBeenCalledTimes(1)
    })

    expect(setSelectedGameTypes).toHaveBeenCalledWith([
      'Select all',
      'Option 1',
      'Option 2',
      'Option 3',
    ])
  })

  it('deselects all options when "Select all" is clicked again', () => {
    jest.mocked(useGameType).mockReturnValue({
      selectedGameTypes: ['Select all', 'Option 1', 'Option 2', 'Option 3'],
      setSelectedGameTypes,
    })

    renderWithTheme(<GameType {...PROPS} />)

    fireEvent.click(screen.getByText('Select plays')) 
    fireEvent.click(screen.getByTestId('item-Select all')) 
    
    expect(setSelectedGameTypes).toHaveBeenCalledTimes(1)
    expect(setSelectedGameTypes).toHaveBeenCalledWith([])
  })
})
