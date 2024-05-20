import { useContext } from 'react'
import GameTypeContext from '../context/GameTypeContext'

const useGameType = () => {
  const context = useContext(GameTypeContext)

  if (!context) {
    throw new Error('useGameType must be used within a GameTypeProvider')
  }

  return context
}

export default useGameType
