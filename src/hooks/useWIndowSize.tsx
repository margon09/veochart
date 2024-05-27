import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    deviceType: 'desktop',
    isMinorMobile: window.innerWidth <= 375 && window.innerWidth > 344,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      let deviceType = 'desktop'
      let isMinorMobile = width <= 375 && width > 344

      if (width < 599) {
        deviceType = 'mobile'
      } else if (width >= 599 && width < 769) {
        deviceType = 'ipad'
      } 

      setSize({ width, height, deviceType, isMinorMobile })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

export default useWindowSize
