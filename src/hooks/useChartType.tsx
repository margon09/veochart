import { useContext } from 'react'
import ChartTypeContext from '../context/ChartTypeContext'

const useChartType = () => {
  const context = useContext(ChartTypeContext)

  if (!context) {
    throw new Error('useChartTypeContext must be used within a ChartTypeProvider')
  }
  return context
}

export default useChartType
