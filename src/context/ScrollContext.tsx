import { ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface Props {
  children: ReactNode
}

interface ScrollContextType {
  tableContainerRef: RefObject<HTMLDivElement>
  handleIconClick: (direction: 'left' | 'right') => void
  canScrollLeft: boolean
  canScrollRight: boolean
  resetScroll: () => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = ({ children }: Props) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleIconClick = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      if (direction === 'right') {
        tableContainerRef.current.scrollTo({
          left: tableContainerRef.current.scrollWidth,
          behavior: 'smooth',
        })
        setCanScrollLeft(true)
        setCanScrollRight(false)
      } else if (direction === 'left') {
        tableContainerRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
        setCanScrollLeft(false)
        setCanScrollRight(true)
      }
    }
  }

  const resetScroll = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 0
      setCanScrollLeft(false)
      setCanScrollRight(true)
    }
  }

  return (
    <ScrollContext.Provider
      value={{ tableContainerRef, handleIconClick, canScrollLeft, canScrollRight, resetScroll }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export { ScrollContext }
export default ScrollContext
