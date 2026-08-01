import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";
import styles from "./AuthPage.module.css";
import AccessibilityButton from "../components/AccessibilityButton";
import InteractiveMapNavbar from "../components/InteractiveMapNavbar";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "123";

// URL dinámica del Backend: detecta si está en Vercel (Railway) o Localhost automáticamente
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_URL = 
import.meta.env.VITE_API_URL ||
  (isLocal
    ? "http://localhost:3000";
    : "https://remarkable-adaptation-production-5d63.up.railway.app");

export default function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goToHome = () => navigate("/inicio");
  const goToPanel = () => navigate("/admin-page");

  const handleGoogleLogin = async () => {
    setError("");
    try {
      // 1. Iniciar sesión con Google a través del pop-up
      const result = await signInWithPopup(auth, googleProvider);

      // 2. Extraer el token ID directo de GOOGLE (no el de Firebase)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleIdToken = credential?.idToken;

      if (!googleIdToken) {
        throw new Error("No se pudo obtener el token de Google");
      }

      console.log("✅ Token de Google obtenido correctamente");

      // 3. Enviar el token de Google a tu API en Railway
      //const response = await fetch(
      //"https://remarkable-adaptation-production-5d63.up.railway.app/api/auth/google",
      //"http://localhost:3000/api/auth/google",

      //{
      //method: "POST",
      //headers: {
      // "Content-Type": "application/json",
      //},
      //body: JSON.stringify({
      //    tokenGoogle: googleIdToken,
      //   }),
      //  },
      //);

      //if (!response.ok) {
      //  const errorData = await response.json().catch(() => ({}));
      //  throw new Error(
      //    errorData.mensaje || "Error en la respuesta del servidor backend",
      //  );
      //}
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenGoogle: googleIdToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.mensaje || "Error en la respuesta del servidor backend",
        );
      }

      const data = await response.json();
      console.log("✅ Respuesta exitosa del backend:", data);

      // 4. Guardar la sesión generada por tu backend
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.usuario?.rol || "visitante");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data.usuario));

      // 5. Redirigir al inicio
      goToHome();
    } catch (err: any) {
      // Si la ventana emergente fue cerrada por el usuario, no mostrar alerta grave
      if (
        err.code === "auth/cancelled-popup-request" ||
        err.code === "auth/popup-closed-by-user"
      ) {
        console.warn("Pop-up cerrado por el usuario");
        return;
      }

      console.error("Error al iniciar sesión con Google:", err);
      setError(
        err.message ||
          "No se pudo iniciar sesión con Google. Intentá de nuevo.",
      );
    }
  };

  const handleCredentialsSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: ADMIN_USER, role: "admin" }),
      );

      goToPanel();
      return;
    }
    setError("Usuario o contraseña incorrectos");
  };

  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />

      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>

      <main className={styles.pageContainer}>
        {/* SECCIÓN 1: USUARIOS / INVITADOS / GOOGLE */}
        <section className={styles.sectionBlock}>
          <div className={styles.googleHeader}>
            <h1 className={styles.title}>Iniciá sesión o explorá</h1>
            <p className={styles.subtitle}>
              Ingresá directamente o conectá tu cuenta para guardar recorridos
              favoritos
            </p>
          </div>

          <div className={styles.userButtonsGroup}>
            <button
              type="button"
              className={styles.guestButton}
              onClick={() => {
                localStorage.setItem("role", "guest");
                goToHome();
              }}
              aria-label="Ingresar directamente sin iniciar sesión"
            >
              <UserIcon />
              <span>Ingresar sin registro</span>
            </button>

            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
              aria-label="Iniciar sesión con cuenta de Google"
            >
              <GoogleIcon />
              <span>Continuar con Google</span>
            </button>
          </div>

          {error && !username && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </section>

        {/* SECCIÓN 2: ADMINISTRADORES */}
        <section className={`${styles.sectionBlock} ${styles.adminBlock}`}>
          <h2 className={styles.title}>Acceso para administradores</h2>
          <p className={styles.adminSubtitle}>
            Ingresá tus credenciales para gestionar la información del sistema
          </p>

          <form
            className={styles.credentialsForm}
            onSubmit={handleCredentialsSubmit}
          >
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
                  type="password"
                  className={styles.input}
                  placeholder="Ingrese contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && username && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" className={styles.credentialsButton}>
              Acceder como administrador
            </button>
          </form>

          <button type="button" className={styles.forgotPassword}>
            ¿Olvidaste tu contraseña?
          </button>
        </section>
      </main>
    </div>
  );
}

function UserIcon() {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
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
  );
}
