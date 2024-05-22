import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface ChartTypeContextType {
  chartType: string
  setChartType: Dispatch<SetStateAction<string>>
}

const ChartTypeContext = createContext<ChartTypeContextType>({
  chartType: 'Table',
  setChartType: () => {},
})

export const ChartTypeProvider = ({ children }: Props) => {
  const [chartType, setChartType] = useState('Table')

  return (
    <ChartTypeContext.Provider value={{ chartType, setChartType }}>
      {children}
    </ChartTypeContext.Provider>
  )
}

export default ChartTypeContext
