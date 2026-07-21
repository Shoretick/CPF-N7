/* ==========================================================================
   MOTOR DE RENDERIZADO DEL MAPA SVG CON FONDO REAL (PLANTA BAJA)
   ========================================================================== */

import { SPACES, NODES } from './data.js';

// Estado global del visualizador de mapas
let currentFloor = 'PB';
let zoomLevel = 1.0;
let panX = 0;
let panY = 0;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;

let selectedSpaceId = null;
let activeRouteData = null; // { path: Node[], distance: number }
let activeIncidents = [];   // Array de incidencias activas

// Callback registrado al hacer clic en un espacio
let onSpaceSelectedCallback = null;

/**
 * Inicializa el mapa y los manejadores de eventos.
 * @param {Function} onSpaceSelected - Callback cuando el usuario selecciona un espacio en el mapa
 */
export function initMap(onSpaceSelected) {
    onSpaceSelectedCallback = onSpaceSelected;
    
    // Configurar escuchadores de los controles de Zoom flotantes
    document.getElementById('zoom-in-btn').addEventListener('click', () => adjustZoom(0.15));
    document.getElementById('zoom-out-btn').addEventListener('click', () => adjustZoom(-0.15));
    document.getElementById('zoom-reset-btn').addEventListener('click', resetView);

    // Inicializar controles de arrastre del mapa
    const viewport = document.getElementById('map-interactive-container');
    
    viewport.addEventListener('mousedown', startPan);
    window.addEventListener('mousemove', pan);
    window.addEventListener('mouseup', endPan);

    // Soporte táctil para dispositivos móviles
    viewport.addEventListener('touchstart', startPanTouch, { passive: true });
    viewport.addEventListener('touchmove', panTouch, { passive: true });
    viewport.addEventListener('touchend', endPan);

    // Renderizar por primera vez
    render();
}

/**
 * Cambia el piso activo y vuelve a renderizar el mapa.
 * (Nota: Aunque ahora solo hay Planta Baja, se mantiene por compatibilidad)
 */
export function changeFloor(floor) {
    currentFloor = 'PB';
    render();
}

/**
 * Establece la selección visual en un espacio específico.
 */
export function selectSpace(spaceId) {
    selectedSpaceId = spaceId;
    render();
}

/**
 * Dibuja una ruta calculada en el mapa SVG.
 * @param {Object} route - { path: Node[], distance: number }
 */
export function drawRoute(route) {
    activeRouteData = route;
    render();
}

/**
 * Borra la ruta del mapa.
 */
export function clearRoute() {
    activeRouteData = null;
    render();
}

/**
 * Actualiza los reportes/incidencias activas que se dibujarán en el mapa.
 */
export function updateMapIncidents(incidents) {
    activeIncidents = incidents;
    
    // Mostrar banner de advertencia si hay reportes activos
    const hasIncidentsInFloor = activeIncidents.some(i => i.floor === 'PB');
    const banner = document.getElementById('map-incident-banner');
    
    if (banner) {
        if (hasIncidentsInFloor) {
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    }

    render();
}

// --------------------------------------------------------------------------
// MOTOR DE RENDERIZADO SVG DE LA IMAGEN REAL
// --------------------------------------------------------------------------
function render() {
    const holder = document.getElementById('svg-map-holder');
    if (!holder) return;

    // Crear el elemento SVG principal con la relación de aspecto de plano.png (568 x 467)
    let svgHtml = `
        <svg class="building-map" viewBox="0 0 568 467" xmlns="http://www.w3.org/2000/svg" aria-label="Plano interactivo del CFP N.º 7 - Planta Baja">
            <!-- 1. IMAGEN DE FONDO DEL PLANO REAL -->
            <image href="assets/images/plano.png" x="0" y="0" width="568" height="467" />

            <!-- 2. CAPA DE INTERACCIÓN DE ESPACIOS (SUPERPOSICIONES GLASSMORPHIC) -->
    `;

    // Renderizar Aulas, Oficinas y Servicios
    Object.keys(SPACES).forEach(key => {
        const space = SPACES[key];
        const rect = space.rect;
        if (!rect) return;

        // Clases para el polígono de interacción
        let topClass = "room-overlay";
        if (space.id === selectedSpaceId) topClass += " selected";
        if (space.type === "toilet") topClass += " toilet-overlay";
        if (space.type === "toilet-accessible") topClass += " toilet-accessible-overlay";
        if (space.id === "pb-estas-aqui") topClass += " estas-aqui-overlay";

        // Determinar colores y estilos según el estado y tipo
        let fillStyle = "fill: transparent; stroke: transparent; stroke-width: 2; transition: all 0.25s;";
        
        // Si está seleccionado, darle un brillo neon premium
        if (space.id === selectedSpaceId) {
            fillStyle = "fill: rgba(79, 70, 229, 0.2); stroke: var(--primary); stroke-width: 3; stroke-dasharray: 4,4; animation: neonPulse 2s infinite;";
        }

        // Generar elementos de dibujo
        svgHtml += `
            <g class="map-interactive-group" data-id="${space.id}" role="button" aria-label="${space.name}">
                <title>${space.name}</title>
                <!-- Rectángulo de interacción transparente/hover -->
                <rect id="map-${space.id}" x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="6" 
                      class="${topClass}" style="${fillStyle}" data-id="${space.id}" />
            </g>
        `;
    });

    // 3. RENDERIZAR LA RUTA CALCULADA (TRAZO CON ANIMACIÓN NEON)
    if (activeRouteData && activeRouteData.path && activeRouteData.path.length > 0) {
        const pathPoints = activeRouteData.path;

        if (pathPoints.length >= 2) {
            let dAttr = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
            for (let i = 1; i < pathPoints.length; i++) {
                dAttr += ` L ${pathPoints[i].x} ${pathPoints[i].y}`;
            }

            svgHtml += `
                <!-- Ruta Sólida Índigo de Fondo (Sombra/Resplandor) -->
                <path d="${dAttr}" class="route-path-glow" style="fill: none; stroke: var(--primary); stroke-opacity: 0.4; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; filter: blur(3px);" />
                <!-- Ruta Activa Neon con Animación de Flujo -->
                <path d="${dAttr}" class="route-path" style="fill: none; stroke: var(--primary); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 8,6; animation: routeFlow 30s linear infinite;" />
            `;
        }

        // MARCADORES NUMÉRICOS (1) Y (2) EN EXTREMOS DE RUTA
        const startNode = pathPoints[0];
        const endNode = pathPoints[pathPoints.length - 1];

        // Nodo Origen (Círculo blanco/índigo numerado con 1)
        svgHtml += `
            <g class="route-endpoint-group">
                <circle cx="${startNode.x}" cy="${startNode.y}" r="14" style="fill: #ffffff; stroke: var(--primary); stroke-width: 3; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));" />
                <circle cx="${startNode.x}" cy="${startNode.y}" r="11" style="fill: var(--primary);" />
                <text x="${startNode.x}" y="${startNode.y + 4}" style="fill: #ffffff; font-size: 11px; font-weight: 800; text-anchor: middle; font-family: var(--font-heading);">1</text>
                <rect x="${startNode.x - 30}" y="${startNode.y - 32}" width="60" height="15" rx="3" style="fill: var(--primary); opacity: 0.9;" />
                <text x="${startNode.x}" y="${startNode.y - 21}" style="fill: #ffffff; font-size: 8px; font-weight: 800; letter-spacing: 0.5px; text-anchor: middle; font-family: var(--font-heading);">ORIGEN</text>
            </g>
        `;

        // Nodo Destino (Círculo blanco/verde numerado con 2)
        svgHtml += `
            <g class="route-endpoint-group">
                <circle cx="${endNode.x}" cy="${endNode.y}" r="14" style="fill: #ffffff; stroke: var(--accent); stroke-width: 3; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));" />
                <circle cx="${endNode.x}" cy="${endNode.y}" r="11" style="fill: var(--accent);" />
                <text x="${endNode.x}" y="${endNode.y + 4}" style="fill: #ffffff; font-size: 11px; font-weight: 800; text-anchor: middle; font-family: var(--font-heading);">2</text>
                <rect x="${endNode.x - 32}" y="${endNode.y - 32}" width="64" height="15" rx="3" style="fill: var(--accent); opacity: 0.9;" />
                <text x="${endNode.x}" y="${endNode.y - 21}" style="fill: #ffffff; font-size: 8px; font-weight: 800; letter-spacing: 0.5px; text-anchor: middle; font-family: var(--font-heading);">DESTINO</text>
            </g>
        `;
    }

    // 4. CAPA DE INCIDENCIAS DE ACCESIBILIDAD ACTIVAS (Pines de peligro flotantes)
    activeIncidents.forEach(incident => {
        const targetSpace = SPACES[incident.spaceId];
        if (!targetSpace) return;

        const x = targetSpace.x;
        const y = targetSpace.y + 24;

        svgHtml += `
            <g class="incident-pin-group" data-id="${incident.spaceId}" data-desc="${incident.category}: ${incident.description}">
                <!-- Sombra del pin -->
                <ellipse cx="${x}" cy="${y + 8}" rx="8" ry="3" style="fill: rgba(0,0,0,0.2); filter: blur(1px);" />
                <!-- Pin de advertencia -->
                <path d="M ${x} ${y - 15} L ${x + 12} ${y + 5} L ${x - 12} ${y + 5} Z" 
                      style="fill: var(--danger); stroke: #ffffff; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(239, 68, 68, 0.4)); transition: transform 0.2s;" class="incident-pin" />
                <text x="${x}" y="${y + 1}" style="font-size: 10px; font-weight: 900; fill: #ffffff; text-anchor: middle; pointer-events: none; font-family: var(--font-heading);">!</text>
                <title>Incidencia: ${incident.category} - ${incident.description}</title>
            </g>
        `;
    });

    svgHtml += `</svg>`;

    // Insertar en contenedor
    holder.innerHTML = svgHtml;

    // Configurar transformaciones de Zoom y Desplazamiento actuales
    updateTransform();

    // Registrar Eventos para Aulas
    const overlays = holder.querySelectorAll('.room-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const spaceId = e.target.getAttribute('data-id');
            if (onSpaceSelectedCallback) {
                onSpaceSelectedCallback(spaceId);
            }
        });
    });

    // Registrar Eventos para Pines
    const incidentPins = holder.querySelectorAll('.incident-pin-group');
    incidentPins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            const spaceId = pin.getAttribute('data-id');
            if (onSpaceSelectedCallback) {
                onSpaceSelectedCallback(spaceId);
            }
        });
    });
}

// --------------------------------------------------------------------------
// LÓGICA DE CONTROLES DE ZOOM Y PANEO (VÍA CSS TRANSFORMS)
// --------------------------------------------------------------------------
function updateTransform() {
    const holder = document.getElementById('svg-map-holder');
    if (holder) {
        holder.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    }
}

function adjustZoom(factor) {
    zoomLevel += factor;
    zoomLevel = Math.max(0.5, Math.min(3.5, zoomLevel));
    updateTransform();
}

function resetView() {
    zoomLevel = 1.0;
    panX = 0;
    panY = 0;
    updateTransform();
}

function startPan(e) {
    if (e.target.closest('.zoom-btn') || e.target.closest('.room-overlay')) return;
    isDragging = true;
    startDragX = e.clientX - panX;
    startDragY = e.clientY - panY;
    document.getElementById('map-interactive-container').style.cursor = 'grabbing';
}

function pan(e) {
    if (!isDragging) return;
    panX = e.clientX - startDragX;
    panY = e.clientY - startDragY;
    updateTransform();
}

function endPan() {
    isDragging = false;
    const container = document.getElementById('map-interactive-container');
    if (container) {
        container.style.cursor = 'grab';
    }
}

function startPanTouch(e) {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startDragX = e.touches[0].clientX - panX;
    startDragY = e.touches[0].clientY - panY;
}

function panTouch(e) {
    if (!isDragging || e.touches.length !== 1) return;
    panX = e.touches[0].clientX - startDragX;
    panY = e.touches[0].clientY - startDragY;
    updateTransform();
}
