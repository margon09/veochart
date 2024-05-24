import ChartType from '../dropDown/chartType/ChartType'
import GameType from '../dropDown/gameType/GameType'
import { FlexContainer, InnerFlexContainer } from './Header.styles'

interface HeaderContentProps {
  categories: string[]
  handleChartTypeSelect: (type: string) => void
}

const HeaderContent = ({ categories, handleChartTypeSelect }: HeaderContentProps) => (
  <FlexContainer>
    <InnerFlexContainer>
      <ChartType options={['Table', 'Radial']} onSelect={handleChartTypeSelect} />
    </InnerFlexContainer>
    <GameType options={categories} />
  </FlexContainer>
)

export default HeaderContent
