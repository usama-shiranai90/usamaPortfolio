'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { LenisProvider } from '@/components/utilities/LenisProvider'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const AppContext = createContext({})

export function Providers({ children }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)
  const [introShown, setIntroShown] = useState(false)

  return (
    <AppContext.Provider value={{ previousPathname, introShown, setIntroShown }}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionConfig>
      </ThemeProvider>
    </AppContext.Provider>
  )
}
