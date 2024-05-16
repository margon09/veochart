import {
  TableContainer,
  Table,
  TableHeader,
  TableCell
} from './DataTable.styles'
import { matchData } from '../../data/matchData'
import useScrollContext from '../../hooks/useScrollContext'

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

  const keys = Object.keys(
    matchData[0],
  ) as (keyof MatchData)[]

  return (
    <TableContainer ref={tableContainerRef}>
      <Table>
        <thead>
          <tr>
            {keys.map(key => (
              <TableHeader key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {matchData.map((row, index) => (
            <tr key={index}>
              {keys.map(key => (
                <TableCell key={key}>{row[key]}</TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
