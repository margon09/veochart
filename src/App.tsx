import { Suspense, lazy, memo } from 'react'
import {
  ChartContainer,
  Container,
  HeaderContainer,
  SpinnerContainer
} from './App.styles'
import DataTable from './components/dataTable/DataTable'
import Header from './components/header/Header'
import useChartType from './hooks/useChartType'
import { ImSpinner } from 'react-icons/im'

const LazyDataRadar = lazy(() => import('./components/dataRadar/DataRadar'))

const App = memo(() => {
  const { chartType } = useChartType()

  return (
    <Container>
      <HeaderContainer >
          <Header />
      </HeaderContainer>
      <ChartContainer>
        {chartType === 'Table' ? (
          <DataTable />
        ) : (
          <Suspense
            fallback={
              <SpinnerContainer data-cy='loading-spinner' data-testid='loading-spinner'>
                <ImSpinner />
              </SpinnerContainer>
            }
          >
            <LazyDataRadar />
          </Suspense>
        )}
      </ChartContainer>
    </Container>
  )
})

export default App
