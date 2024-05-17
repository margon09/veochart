import React, { ReactNode, createContext, useRef } from 'react'

interface Props {
  children: ReactNode
}

interface ScrollContextType {
  tableContainerRef: React.RefObject<HTMLDivElement>
  handleIconClick: (direction: 'left' | 'right' | 'none') => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = ({ children }: Props) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const handleIconClick = (direction: 'left' | 'right' | 'none') => {
    if (tableContainerRef.current && direction !== 'none') {
      tableContainerRef.current.scrollTo({
        left: direction === 'right' ? tableContainerRef.current.scrollWidth : 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <ScrollContext.Provider value={{ tableContainerRef, handleIconClick }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollContext
