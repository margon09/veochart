export interface MatchData {
  date: string
  attacks: number
  defense: number
  conceded: number
  scored: number
  corners: number
  freeKicks: number
  possession: number
}

export const getMatchDataCategories = (matchData: MatchData[]): string[] => {
  if (matchData.length === 0) {
    return []
  }
  return Object.keys(matchData[0]).filter(key => key !== 'date')
}

export const filterGameTypes = (gameTypes: string[]): string[] => {
  return gameTypes.filter(type => type !== 'Select all')
}
