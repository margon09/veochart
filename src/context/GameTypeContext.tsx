import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react'
import { matchData } from '../data/matchData'
import { getMatchDataCategories } from '../utils/matchDataUtils'

interface Props {
  children: ReactNode
}

interface GameTypeContextType {
  selectedGameTypes: string[]
  setSelectedGameTypes: Dispatch<SetStateAction<string[]>>
}

const GameTypeContext = createContext<GameTypeContextType>({
  selectedGameTypes: [],
  setSelectedGameTypes: () => {},
})

export const GameTypeProvider = ({ children }: Props) => {
  const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([])

  useEffect(() => {
    const allKeys = getMatchDataCategories(matchData)
    setSelectedGameTypes(allKeys)
  }, [])

  return (
    <GameTypeContext.Provider value={{ selectedGameTypes, setSelectedGameTypes }}>
      {children}
    </GameTypeContext.Provider>
  )
}

export default GameTypeContext
