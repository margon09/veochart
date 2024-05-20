import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react'
import { matchData } from '../data/matchData'

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
    const allKeys = Object.keys(matchData[0]).filter(key => key !== 'date')
    setSelectedGameTypes(allKeys)
  }, [])

  return (
    <GameTypeContext.Provider value={{ selectedGameTypes, setSelectedGameTypes }}>
      {children}
    </GameTypeContext.Provider>
  )
}

export default GameTypeContext
