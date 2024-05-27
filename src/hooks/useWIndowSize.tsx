import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    deviceType: 'desktop'
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      let deviceType = 'desktop'

      if (width < 599) {
        deviceType = 'mobile'
      } else if (width >= 599 && width < 769) {
        deviceType = 'ipad'
      }

      setSize({ width, height, deviceType })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

export default useWindowSize
