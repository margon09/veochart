import { render, screen } from '@testing-library/react'
import DataTable from './DataTable'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'
import useScrollContext from '../../hooks/useScrollContext'
import useGameType from '../../hooks/useGameType'
import { matchData } from '../../data/matchData'

jest.mock('../../hooks/useScrollContext')
jest.mock('../../hooks/useGameType')

const renderWithTheme = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('DataTable', () => {
  const setSelectedGameTypes = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    jest.mocked(useScrollContext).mockReturnValue({
      tableContainerRef: { current: null },
      handleIconClick: jest.fn(),
      canScrollLeft: true,
      canScrollRight: true,
      resetScroll: jest.fn(),
    })

    jest.mocked(useGameType).mockReturnValue({
      selectedGameTypes: ['attacks', 'defense', 'scored', 'Select all'],
      setSelectedGameTypes,
    })
  })

  it('renders table headers correctly', () => {
    renderWithTheme(<DataTable />)
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Attacks')).toBeInTheDocument()
    expect(screen.getByText('Defense')).toBeInTheDocument()
    expect(screen.getByText('Scored')).toBeInTheDocument()
  })

  it('renders table rows correctly', () => {
    renderWithTheme(<DataTable />)

    matchData.forEach(row => {
      // eslint-disable-next-line testing-library/no-node-access
      const rowElement = screen.getByText(row.date).closest('tr')
      expect(rowElement).toBeInTheDocument()
      expect(rowElement).toHaveTextContent(row.attacks.toString())
      expect(rowElement).toHaveTextContent(row.defense.toString())
      expect(rowElement).toHaveTextContent(row.scored.toString())
    })
  })

  it('handles empty data correctly', () => {
    jest.mocked(useGameType).mockReturnValue({
      selectedGameTypes: [],
      setSelectedGameTypes,
    })

    renderWithTheme(<DataTable />)
    expect(screen.getByText('Date')).toBeInTheDocument()
  })
})
