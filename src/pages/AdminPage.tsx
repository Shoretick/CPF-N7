import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";
import InteractiveMapNavbar from "../components/InteractiveMapNavbar";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin";

export default function AdminPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: ADMIN_USER, role: "admin" }),
      );
      navigate("/inicio");
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />

      <main className={styles.pageContainer}>
        <section className={styles.adminBlock}>
          <h1 className={styles.title}>Acceso para administradores</h1>
          <p className={styles.adminSubtitle}>
            Ingresá tus credenciales para gestionar la información del sistema
          </p>

          <form className={styles.credentialsForm} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="admin-username" className={styles.fieldLabel}>
                USUARIO:
              </label>
              <div className={styles.inputContainer}>
                <span className={styles.inputIcon} aria-hidden="true">
                  👤
                </span>
                <input
                  id="admin-username"
                  type="text"
                  className={styles.input}
                  placeholder="Ingrese usuario..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="admin-password" className={styles.fieldLabel}>
                CONTRASEÑA:
              </label>
              <div className={styles.inputContainer}>
                <span className={styles.inputIcon} aria-hidden="true">
                  🔒
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Ingrese contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePasswordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" className={styles.credentialsButton}>
              Acceder como administrador
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
