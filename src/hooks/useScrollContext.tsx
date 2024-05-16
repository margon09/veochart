import { useContext } from 'react'
import ScrollContext from '../context/ScrollContext'

const useScrollContext = () => {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider')
  }
  return context
}

export default useScrollContext
