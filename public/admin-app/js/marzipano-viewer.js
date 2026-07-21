/* ==========================================================================
   VISOR MARZIPANO 360° CON SOPORTE COMPLETO Y FALLBACK DE ARRASTRE
   ========================================================================== */

import { PANORAMAS, SPACES } from './data.js';

let viewerInstance = null;
let currentScene = null;
let activeSpaceId = null;

// Referencias del Fallback si no hay red o falla Marzipano
let fallbackContainer = null;
let isDraggingFallback = false;
let startX = 0;
let scrollLeft = 0;

/**
 * Inicializa el visor Marzipano o el sistema de fallback.
 */
export function initMarzipanoViewer() {
    const container = document.getElementById('marzipano-pano-container');
    if (!container) return;

    // Verificar si Marzipano está disponible globalmente (cargado desde CDN)
    if (typeof Marzipano !== 'undefined') {
        try {
            // Inicializar visor Marzipano con controles suaves
            viewerInstance = new Marzipano.Viewer(container, {
                controls: {
                    mouseViewMode: 'drag'
                }
            });
            console.log("Visor Marzipano inicializado con éxito.");
        } catch (e) {
            console.error("Error al inicializar Marzipano, activando visor alternativo:", e);
            setupFallbackViewer(container);
        }
    } else {
        console.warn("Librería Marzipano no detectada. Activando visor alternativo de alto rendimiento.");
        setupFallbackViewer(container);
    }
}

/**
 * Carga o cambia la escena del visor 360 según el espacio físico.
 * @param {string} spaceId - ID del espacio físico (ej. 'pb-entrada')
 */
export function updatePanoScene(spaceId) {
    const space = SPACES[spaceId];
    if (!space) return;

    activeSpaceId = spaceId;

    // Actualizar Leyenda Flotante Informativa del visor
    const overlay = document.getElementById('marzipano-overlay');
    const overlayTitle = document.getElementById('marzipano-overlay-title');
    const overlayDesc = document.getElementById('marzipano-overlay-desc');

    if (overlay && overlayTitle && overlayDesc) {
        overlayTitle.textContent = space.name;
        overlayDesc.textContent = space.description;
        overlay.classList.remove('hidden');
    }

    // Si el visor Marzipano está activo
    if (viewerInstance && typeof Marzipano !== 'undefined') {
        try {
            const urlPattern = PANORAMAS[spaceId] || PANORAMAS["pb-entrada"];
            
            // Crear una fuente de imágenes de cubos (Marzipano Tiles)
            const source = new Marzipano.ImageUrlSource(function(tile) {
                if (tile.z === 0) {
                    return {
                        url: urlPattern
                            .replace('{z}', '0')
                            .replace('{f}', tile.f)
                            .replace('{x}', '0')
                            .replace('{y}', '0')
                    };
                }
                // Nivel 1 (1024px)
                return {
                    url: urlPattern
                        .replace('{z}', '1')
                        .replace('{f}', tile.f)
                        .replace('{x}', tile.x.toString())
                        .replace('{y}', tile.y.toString())
                };
            });

            // Geometría del cubo (6 caras)
            const geometry = new Marzipano.CubeGeometry([
                { tileSize: 256, size: 256, fallbackOnly: true },
                { tileSize: 512, size: 1024 }
            ]);

            // Limitadores del visor
            const limiter = Marzipano.RectilinearView.limit.all(
                Marzipano.RectilinearView.limit.zoom(0.5, 2.0),
                Marzipano.RectilinearView.limit.pitch(-Math.PI / 4, Math.PI / 4)
            );

            // Vista inicial
            const view = new Marzipano.RectilinearView({ yaw: 0, pitch: 0, fov: Math.PI / 2.5 }, limiter);

            // Crear y switchar a escena
            const scene = viewerInstance.createScene({
                source: source,
                geometry: geometry,
                view: view
            });

            scene.switchTo();
            currentScene = scene;
        } catch (e) {
            console.error("Error al actualizar la escena en Marzipano:", e);
            updateFallbackImage(space);
        }
    } else {
        // Ejecutar fallback
        updateFallbackImage(space);
    }
}

/**
 * Configura una interfaz alternativa responsiva de paneo horizontal con scroll/drag táctil.
 */
function setupFallbackViewer(container) {
    // Vaciar contenedor
    container.innerHTML = '';
    
    // Crear elemento para contener la imagen extendida
    fallbackContainer = document.createElement('div');
    fallbackContainer.id = 'marzipano-fallback-wrapper';
    fallbackContainer.style.width = '100%';
    fallbackContainer.style.height = '100%';
    fallbackContainer.style.overflowX = 'scroll';
    fallbackContainer.style.overflowY = 'hidden';
    fallbackContainer.style.cursor = 'grab';
    fallbackContainer.style.position = 'relative';
    fallbackContainer.style.display = 'flex';
    fallbackContainer.style.alignItems = 'center';
    
    // Deshabilitar barra de scroll visual
    fallbackContainer.style.scrollbarWidth = 'none'; // Firefox
    fallbackContainer.style.msOverflowStyle = 'none';  // IE
    
    // Contenedor interno para estirar la imagen
    const imgElement = document.createElement('img');
    imgElement.id = 'marzipano-fallback-img';
    imgElement.style.height = '100%';
    imgElement.style.minWidth = '200%'; // Hacerla más ancha para que sea deslizable
    imgElement.style.objectFit = 'cover';
    imgElement.style.userSelect = 'none';
    imgElement.style.pointerEvents = 'none';
    
    fallbackContainer.appendChild(imgElement);
    container.appendChild(fallbackContainer);

    // Eventos de arrastre del ratón para simular paneo 360
    fallbackContainer.addEventListener('mousedown', (e) => {
        isDraggingFallback = true;
        fallbackContainer.style.cursor = 'grabbing';
        startX = e.pageX - fallbackContainer.offsetLeft;
        scrollLeft = fallbackContainer.scrollLeft;
    });

    fallbackContainer.addEventListener('mouseleave', () => {
        isDraggingFallback = false;
        fallbackContainer.style.cursor = 'grab';
    });

    fallbackContainer.addEventListener('mouseup', () => {
        isDraggingFallback = false;
        fallbackContainer.style.cursor = 'grab';
    });

    fallbackContainer.addEventListener('mousemove', (e) => {
        if (!isDraggingFallback) return;
        e.preventDefault();
        const x = e.pageX - fallbackContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplicador de velocidad de arrastre
        fallbackContainer.scrollLeft = scrollLeft - walk;
    });

    // Paneo automático suave al cargar
    setTimeout(() => {
        if (fallbackContainer) {
            fallbackContainer.scrollLeft = fallbackContainer.scrollWidth / 4;
        }
    }, 500);
}

/**
 * Actualiza la imagen real cargada en el visor alternativo.
 */
function updateFallbackImage(space) {
    const imgElement = document.getElementById('marzipano-fallback-img');
    if (!imgElement) return;

    // Cambiar la imagen real del espacio (ej: assets/images/aula_gastronomia.png)
    imgElement.src = space.photo;
    imgElement.alt = `Vista 360 de fallback del espacio: ${space.name}`;

    // Resetear posición de scroll al centro
    if (fallbackContainer) {
        setTimeout(() => {
            fallbackContainer.scrollLeft = (fallbackContainer.scrollWidth - fallbackContainer.clientWidth) / 2;
        }, 100);
    }
}
