/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: "934541472904-h0omvotbj45vllg4hct29k7hb9sso7fe.apps.googleusercontent.com"
} // <-- Te faltaba cerrar esta llave

interface ImportMeta {
  readonly env: ImportMetaEnv
}