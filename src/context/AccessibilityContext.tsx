import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AccessibilityState = {
  highContrast: boolean
  largeText: boolean
  voiceAssistance: boolean
  setHighContrast: (value: boolean) => void
  setLargeText: (value: boolean) => void
  setVoiceAssistance: (value: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityState | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [voiceAssistance, setVoiceAssistance] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', largeText)
  }, [largeText])

  const value = useMemo(
    () => ({
      highContrast,
      largeText,
      voiceAssistance,
      setHighContrast,
      setLargeText,
      setVoiceAssistance,
    }),
    [highContrast, largeText, voiceAssistance],
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de AccessibilityProvider')
  }
  return context
}

export function useVoiceAnnouncement() {
  const { voiceAssistance } = useAccessibility()

  return useCallback(
    (text: string) => {
      if (!voiceAssistance || !('speechSynthesis' in window)) return

      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'es-AR'
      window.speechSynthesis.speak(utterance)
    },
    [voiceAssistance],
  )
}
