import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccessibilityButton from './AccessibilityButton'
import styles from './InteractiveMapNavbar.module.css'

const NAV_LINKS = [
  { label: 'Inicio', href: '/inicio#inicio' },
  { label: 'Nuestras propuestas', href: '/inicio#propuestas' },
  { label: 'Donde encontrarnos', href: '/inicio#ubicacion' },
  { label: 'Contacto', href: '/inicio#contacto' },
] as const

export default function InteractiveMapNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link
          to="/inicio"
          className={styles.backButton}
          aria-label="Volver a la página anterior"
        >
          <BackIcon />
        </Link>

        <div className={styles.brand}>
          <div className={styles.logoSlot} aria-label="Logo del CFP N.° 7">
            <span className={styles.logoPlaceholder}>Logo</span>
          </div>
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTitle}>CFP N°7</span>
            <span className={styles.brandSubtitle}>Mapa interactivo</span>
          </div>
        </div>

        <div className={styles.desktopActions}>
          <AccessibilityButton variant="navbar" />
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="map-mobile-nav-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="map-mobile-nav-menu"
          className={styles.mobileMenu}
          aria-label="Menú de navegación móvil"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className={styles.mobileNavLink}
                  to={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function BackIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      />
    </svg>
  )
}
