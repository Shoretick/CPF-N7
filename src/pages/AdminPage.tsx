import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/InteractiveMapNavbar";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Leer las credenciales guardadas en el navegador
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");

    // 2. Si no es admin o no está autenticado, lo redirige al login
    if (!isAuthenticated || role !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    // 3. Si es válido, habilita la visualización del panel
    setIsAuthorized(true);
  }, [navigate]);

  // Mientras valida la sesión, no muestra nada para evitar destellos en pantalla
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.main} id="inicio">
        <iframe
          className={styles.marzipanoContainer}
          title="Ubicación del Centro de Formación Profesional N° 7"
          src="/admin-app/index.html"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
