import { useEffect, useRef, useState } from 'react'
import AccessibilityPanel from './AccessibilityPanel'
import styles from './AccessibilityButton.module.css'

const BUTTON_SIZE = 56
const NAVBAR_OFFSET = 72

type AccessibilityButtonProps = {
  variant?: 'floating' | 'navbar'
}

export default function AccessibilityButton({ variant = 'floating' }: AccessibilityButtonProps) {
  const [position, setPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - BUTTON_SIZE - 16 : 16,
    y: NAVBAR_OFFSET + 16,
  }))
  const [panelOpen, setPanelOpen] = useState(false)
  const dragging = useRef(false)
  const hasMoved = useRef(false)
  const pointerOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (variant !== 'floating') return

    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - BUTTON_SIZE - 8),
        y: Math.max(NAVBAR_OFFSET + 8, Math.min(prev.y, window.innerHeight - BUTTON_SIZE - 8)),
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [variant])

  const clampPosition = (x: number, y: number) => {
    const maxX = window.innerWidth - BUTTON_SIZE - 8
    const maxY = window.innerHeight - BUTTON_SIZE - 8
    const minY = NAVBAR_OFFSET + 8

    return {
      x: Math.max(8, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY)),
    }
  }

  const openPanel = () => setPanelOpen(true)

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (variant === 'navbar') return

    dragging.current = true
    hasMoved.current = false
    pointerOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (variant !== 'floating' || !dragging.current) return

    hasMoved.current = true
    const next = clampPosition(
      event.clientX - pointerOffset.current.x,
      event.clientY - pointerOffset.current.y,
    )
    setPosition(next)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (variant === 'navbar') return

    if (!dragging.current) return

    dragging.current = false
    event.currentTarget.releasePointerCapture(event.pointerId)

    if (!hasMoved.current) {
      openPanel()
    }
  }

  const handleClick = () => {
    if (variant === 'navbar') {
      openPanel()
    }
  }

  const buttonClass =
    variant === 'navbar'
      ? `${styles.button} ${styles.navbarButton}`
      : `${styles.button} ${styles.floatingButton}`

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        style={variant === 'floating' ? { left: position.x, top: position.y } : undefined}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-label="Abrir opciones de accesibilidad"
      >
        <AccessibilityIcon />
      </button>

      {panelOpen && <AccessibilityPanel onClose={() => setPanelOpen(false)} />}
    </>
  )
}

function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <path
        fill="currentColor"
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1.07A7.001 7.001 0 0 1 13 20.9V22a1 1 0 0 1-2 0v-1.1A7.001 7.001 0 0 1 5.07 16H4a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2zm-5 14a5 5 0 1 0 10 0H7z"
      />
    </svg>
  )
}
