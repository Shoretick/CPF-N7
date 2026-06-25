/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: "238563787451-7kiuqqkkhiqn9rij7tggnbijo0k8a3cc.apps.googleusercontent.com"
} // <-- Te faltaba cerrar esta llave

interface ImportMeta {
  readonly env: ImportMetaEnv
}