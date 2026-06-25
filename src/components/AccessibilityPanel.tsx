import { useAccessibility } from '../context/AccessibilityContext'
import Switch from './Switch'
import styles from './AccessibilityPanel.module.css'

type AccessibilityPanelProps = {
  onClose: () => void
}

export default function AccessibilityPanel({ onClose }: AccessibilityPanelProps) {
  const {
    highContrast,
    largeText,
    voiceAssistance,
    setHighContrast,
    setLargeText,
    setVoiceAssistance,
  } = useAccessibility()

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="accesibilidad-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title} id="accesibilidad-titulo">
            Accesibilidad
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar panel de accesibilidad"
          >
            ×
          </button>
        </div>

        <p className={styles.subtitle}>Configura tu experiencia</p>

        <div className={styles.options}>
          <div className={styles.option}>
            <div className={styles.optionLabel}>
              <ContrastIcon />
              <span>Contraste alto</span>
            </div>
            <Switch
              checked={highContrast}
              onChange={setHighContrast}
              label="Activar contraste alto"
            />
          </div>

          <div className={styles.option}>
            <div className={styles.optionLabel}>
              <TextIcon />
              <span>Texto grande</span>
            </div>
            <Switch
              checked={largeText}
              onChange={setLargeText}
              label="Activar texto grande"
            />
          </div>

          <div className={styles.option}>
            <div className={styles.optionLabel}>
              <AudioIcon />
              <span>Asistencia por voz</span>
            </div>
            <Switch
              checked={voiceAssistance}
              onChange={setVoiceAssistance}
              label="Activar asistencia por voz"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContrastIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2V4a8 8 0 1 1 0 16z"
      />
    </svg>
  )
}

function TextIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 4v3h5.5v12h3V7H19V4H5zm14 14h-3v3h3v-3z"
      />
    </svg>
  )
}

function AudioIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06A4.494 4.494 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"
      />
    </svg>
  )
}
