import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import styles from './AuthPage.module.css'

const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = '1234'

export default function AuthPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const goToHome = () => navigate('/inicio')

  const loginWithGoogle = useGoogleLogin({
    onSuccess: () => goToHome(),
    onError: () => {
      console.error('Error al iniciar sesión con Google')
    },
  })

  const handleCredentialsSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      goToHome()
      return
    }

    setError('Usuario o contraseña incorrectos')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoSlot} aria-label="Logo del CFP N.° 7">
          <span className={styles.logoPlaceholder}>Logo</span>
        </div>

        <h1 className={styles.title}>CFP N.° 7</h1>
        <p className={styles.subtitle}>Navegacion Asistida y Accesibilidad</p>

        <form className={styles.credentialsForm} onSubmit={handleCredentialsSubmit}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Usuario</span>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Ingresá tu usuario"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Contraseña</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.credentialsButton}>
            Iniciar sesión
          </button>
        </form>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={() => loginWithGoogle()}
        >
          <GoogleIcon />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg
      className={styles.googleIcon}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
