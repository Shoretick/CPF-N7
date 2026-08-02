# CFP N7

Aplicación web desarrollada con React, TypeScript y Vite para mostrar información, recorridos y accesibilidad del Centro de Formación Profesional N°7.

## Descripción

Este proyecto permite:

- navegar por una interfaz principal del centro educativo;
- explorar sectores del campus mediante mapas interactivos;
- acceder a recorridos virtuales en 360°;
- iniciar sesión con Google o como invitado;
- gestionar contenido desde un panel administrativo.

## Tecnologías principales

- React 19
- TypeScript
- Vite
- React Router DOM
- Firebase Authentication
- CSS Modules

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

1. Entrar al directorio del proyecto:

   ```bash
   cd CPF-N7
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` con las variables de Firebase necesarias:

   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   ```

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Previsualiza la build generada.

## Estructura del proyecto

```text
src/
  components/     Componentes reutilizables
  context/        Contextos de React
  pages/          Páginas principales de la app
  services/       Servicios y llamadas externas
  firebase.ts     Configuración de Firebase
```

## Despliegue en Vercel

Este proyecto puede publicarse en Vercel directamente desde GitHub.

### Pasos básicos

1. Subir el repositorio a GitHub.
2. Iniciar sesión en Vercel y crear un nuevo proyecto.
3. Conectar el repositorio de GitHub.
4. Usar estas configuraciones:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Agregar las variables de entorno necesarias en Vercel, incluyendo las de Firebase.

### Variables de entorno recomendadas

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

> La configuración de rutas SPA ya está preparada mediante el archivo `vercel.json`.

## Notas importantes

- El login con Google se comunica con un backend externo configurado en la vista de autenticación.
- La aplicación incluye rutas específicas para mapas, tours 360° y administración.
- Algunos recursos multimedia y vistas virtuales se encuentran dentro de la carpeta `public/`.

## Estado del proyecto

Proyecto en desarrollo con enfoque en experiencia de usuario, accesibilidad y recorrido virtual del campus.
