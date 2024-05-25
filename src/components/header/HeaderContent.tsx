import ChartType from '../dropDown/chartType/ChartType'
import GameType from '../dropDown/gameType/GameType'
import { FlexContainer, InnerFlexContainer } from './Header.styles'

interface HeaderContentProps {
  categories: string[]
  handleChartTypeSelect: (type: string) => void
  currentChartType: string
}

const HeaderContent = ({
  categories,
  handleChartTypeSelect,
  currentChartType,
}: HeaderContentProps) => (
  <FlexContainer>
    <InnerFlexContainer>
      <ChartType
        options={['Table', 'Radial']}
        onSelect={handleChartTypeSelect}
        selectedOption={currentChartType}
      />
    </InnerFlexContainer>
    <GameType options={categories} />
  </FlexContainer>
)

export default HeaderContent
