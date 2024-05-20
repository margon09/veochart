import {
  ReactNode,
  RefObject,
  createContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'

interface Props {
  children: ReactNode
}

interface ScrollContextType {
  tableContainerRef: RefObject<HTMLDivElement>
  handleIconClick: (direction: 'left' | 'right' | 'none') => void
  canScrollLeft: boolean
  canScrollRight: boolean
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider = ({ children }: Props) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [initialScrollCheckDone, setInitialScrollCheckDone] = useState(false)

  const handleScroll = useCallback(() => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current
      setCanScrollLeft(scrollLeft > 0)

      if (!initialScrollCheckDone) {
        setCanScrollRight(true)
        setInitialScrollCheckDone(true)
      } else {
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
      }

    }
  }, [initialScrollCheckDone])

  const handleIconClick = (direction: 'left' | 'right' | 'none') => {
    if (tableContainerRef.current && direction !== 'none') {
      tableContainerRef.current.scrollTo({
        left: direction === 'right' ? tableContainerRef.current.scrollWidth : 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const currentRef = tableContainerRef.current
    if (currentRef) {
      handleScroll()
      currentRef.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  useEffect(() => {
  }, [canScrollRight])

  return (
    <ScrollContext.Provider
      value={{ tableContainerRef, handleIconClick, canScrollLeft, canScrollRight }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollContext



