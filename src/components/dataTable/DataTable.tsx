import { TableContainer, Table, TableHeader, TableCell } from './DataTable.styles'
import { matchData } from '../../data/matchData'
import useScrollContext from '../../hooks/useScrollContext'
import useGameType from '../../hooks/useGameType'

interface MatchData {
  date: string
  attacks: number
  defense: number
  conceded: number
  scored: number
  corners: number
  freeKicks: number
  possession: string
}

const DataTable = () => {
  const { tableContainerRef } = useScrollContext()
  const { selectedGameTypes } = useGameType()

  return (
    <TableContainer ref={tableContainerRef}>
      <Table>
        <thead>
          <tr>
            {['date', ...selectedGameTypes.filter(k => k !== 'Select all')].map(key => (
              <TableHeader key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {matchData.map((row, index) => (
            <tr key={index}>
              {['date', ...selectedGameTypes.filter(k => k !== 'Select all')].map(key => (
                <TableCell key={key}>
                  {key !== 'possession'
                    ? row[key as keyof MatchData]
                    : row[key as keyof MatchData] + '%'}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
