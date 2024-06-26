import { useMemo } from 'react'
import { TableContainer, Table, TableHeader, TableCell } from './DataTable.styles'
import { matchData } from '../../data/matchData'
import useScrollContext from '../../hooks/useScrollContext'
import useGameType from '../../hooks/useGameType'
import { MatchData, filterGameTypes } from '../../utils/matchDataUtils'

const DataTable = () => {
  const { tableContainerRef } = useScrollContext()
  const { selectedGameTypes } = useGameType()

  const headers = useMemo(
    () => ['date', ...filterGameTypes(selectedGameTypes)],
    [selectedGameTypes]
  )

  return (
    <TableContainer ref={tableContainerRef}>
      <Table>
        <thead>
          <tr>
            {headers.map(key => (
              <TableHeader key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {matchData.map((row, index) => (
            <tr key={index}>
              {headers.map(key => (
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
