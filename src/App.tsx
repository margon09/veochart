import { Container } from './App.styles'
import DataTable from './components/dataTable/DataTable'
import Header from './components/header/Header'
import DataRadar from './components/dataRadar/DataRadar'
import useChartType from './hooks/useChartType'

function App() {
  const { chartType } = useChartType()
  
  return (
    <Container>
      <Header />
      {chartType === 'Table' ? <DataTable /> : <DataRadar />}
    </Container>
  )
}

export default App
