import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import styles from "./AuthPage.module.css";
import InteractiveMapNavbar from "../components/InteractiveMapNavbar";

const API_URL = "https://remarkable-adaptation-production-5d63.up.railway.app";

export default function AuthPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const goToAdminLogin = () => {
    localStorage.setItem("role", "admin");
    navigate("/admin-page");
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleIdToken = credential?.idToken;

      if (!googleIdToken) {
        throw new Error("No se pudo obtener el token de Google");
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: googleIdToken }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
        }
      } catch (backendErr) {
        console.warn(
          "Backend Railway no respondió, usando sesión local:",
          backendErr,
        );
      }

      localStorage.setItem("role", "user");
      navigate("/inicio");
    } catch (err: any) {
      console.error("Error al iniciar sesión con Google:", err);
      setError("Error al iniciar sesión con Google. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />

      <main className={styles.pageContainer}>
        <section className={styles.sectionBlock}>
          <div className={styles.headerGroup}>
            <h1 className={styles.title}>Iniciá sesión o explorá</h1>
            <p className={styles.subtitle}>
              Conectá tu cuenta de Google o accedé al panel de gestión
            </p>
          </div>

          <div className={styles.userButtonsGroup}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
              aria-label="Continuar con tu cuenta de Google"
            >
              <GoogleIcon />
              <span>Continuar con Google</span>
            </button>

            <button
              type="button"
              className={styles.adminButton}
              onClick={goToAdminLogin}
              aria-label="Ir a la pantalla de acceso para administradores"
            >
              <AdminIcon />
              <span>Acceder como Administrador</span>
            </button>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      className={styles.googleIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
