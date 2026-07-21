/* ==========================================================================
   MOTOR DE NAVEGACIÓN: ALGORITMO DIJKSTRA Y DIARIOS DE VOZ (TTS)
   ========================================================================== */

import { NODES, LINKS, SPACES } from './data.js';

/**
 * Calcula la ruta óptima entre dos espacios utilizando Dijkstra.
 * @param {string} startSpaceId - ID del espacio de origen (ej. 'pb-entrada')
 * @param {string} endSpaceId - ID del espacio de destino (ej. '1p-aula-5')
 * @param {boolean} accessibleOnly - Si es verdadero, filtra rutas que no sean accesibles
 * @returns {Object|null} Ruta calculada: { path: Node[], distance: number, steps: string[] }
 */
export function findRoute(startSpaceId, endSpaceId, accessibleOnly = false) {
    // 1. Encontrar los nodos correspondientes a los espacios de origen/destino
    const startNode = NODES.find(n => n.spaceId === startSpaceId);
    const endNode = NODES.find(n => n.spaceId === endSpaceId);

    if (!startNode || !endNode) {
        console.error("Nodos de origen o destino no encontrados.");
        return null;
    }

    const startId = startNode.id;
    const endId = endNode.id;

    // 2. Construir la lista de adyacencia filtrada por accesibilidad si aplica
    const adjacency = {};
    NODES.forEach(node => {
        adjacency[node.id] = [];
    });

    LINKS.forEach(link => {
        // Si se requiere ruta accesible y el enlace no lo es, se descarta
        if (accessibleOnly && !link.accessible) {
            return;
        }

        // El grafo es bidireccional
        adjacency[link.u].push({ node: link.v, weight: link.weight, linkInfo: link });
        adjacency[link.v].push({ node: link.u, weight: link.weight, linkInfo: link });
    });

    // 3. Inicialización del Algoritmo Dijkstra
    const distances = {};
    const previous = {};
    const queue = new Set();

    NODES.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        queue.add(node.id);
    });

    distances[startId] = 0;

    // 4. Bucle principal de Dijkstra
    while (queue.size > 0) {
        // Encontrar el nodo con la distancia mínima en la cola
        let u = null;
        for (const nodeId of queue) {
            if (u === null || distances[nodeId] < distances[u]) {
                u = nodeId;
            }
        }

        // Si la distancia mínima es infinito, los nodos restantes son inalcanzables
        if (distances[u] === Infinity) {
            break;
        }

        // Si llegamos al destino, detenemos la búsqueda
        if (u === endId) {
            break;
        }

        queue.delete(u);

        // Evaluar vecinos
        const neighbors = adjacency[u] || [];
        for (const neighbor of neighbors) {
            const v = neighbor.node;
            if (!queue.has(v)) continue;

            const alt = distances[u] + neighbor.weight;
            if (alt < distances[v]) {
                distances[v] = alt;
                previous[v] = u;
            }
        }
    }

    // 5. Reconstruir el camino desde el destino al origen
    if (distances[endId] === Infinity) {
        return null; // No hay ruta disponible con las restricciones actuales
    }

    const pathIds = [];
    let curr = endId;
    while (curr !== null) {
        pathIds.unshift(curr);
        curr = previous[curr];
    }

    // Traducir IDs a objetos de Nodo completos
    const pathNodes = pathIds.map(id => NODES.find(n => n.id === id));

    // 6. Generar indicaciones de guiado escritas detalladas
    const steps = generateStepDirections(pathNodes, accessibleOnly);

    return {
        path: pathNodes,
        distance: distances[endId],
        steps: steps
    };
}

/**
 * Genera indicaciones paso a paso a partir de un camino de nodos.
 */
function generateStepDirections(path, accessibleOnly) {
    const steps = [];
    
    // Obtener los nombres amigables de los extremos
    const startSpace = SPACES[path[0].spaceId];
    const endSpace = SPACES[path[path.length - 1].spaceId];

    steps.push(`Inicie su recorrido en **${startSpace.name}** (${startSpace.floorLabel}).`);

    for (let i = 0; i < path.length - 1; i++) {
        const current = path[i];
        const next = path[i + 1];

        // Buscar enlace correspondiente en los links
        const link = LINKS.find(l => 
            (l.u === current.id && l.v === next.id) || 
            (l.u === next.id && l.v === current.id)
        );

        if (!link) continue;



        // Indicación estándar del enlace
        // Ajustamos la dirección o texto según el sentido de avance
        let actionDesc = link.desc;
        
        // Personalizar descripciones para que suenen más dinámicas basándose en el destino
        if (next.isRoom && next.spaceId) {
            const targetRoomName = SPACES[next.spaceId].name;
            actionDesc = `Avance y diríjase hacia la entrada de **${targetRoomName}**.`;
        }

        steps.push(actionDesc);
    }

    steps.push(`Ha llegado a su destino: **${endSpace.name}**.`);
    return steps;
}

// --------------------------------------------------------------------------
// LECTOR DE INDICACIONES CON SÍNTESIS DE VOZ (SPEECH SYNTHESIS)
// --------------------------------------------------------------------------
let speechUtterance = null;

/**
 * Lee en voz alta las indicaciones paso a paso.
 * @param {string[]} steps - Lista de indicaciones
 * @param {Function} onStartCallback - Se ejecuta cuando inicia la voz
 * @param {Function} onEndCallback - Se ejecuta cuando finaliza la voz
 */
export function speakRoute(steps, onStartCallback, onEndCallback) {
    // Detener cualquier reproducción en curso
    stopSpeaking();

    if (!('speechSynthesis' in window)) {
        console.warn("La síntesis de voz no está soportada en este navegador.");
        return;
    }

    // Unificar las indicaciones limpiando la sintaxis markdown (asteriscos)
    const textToSpeak = steps
        .map(step => step.replace(/\*\*/g, ''))
        .join('. ');

    speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    speechUtterance.lang = 'es-ES'; // Español estándar
    speechUtterance.rate = 1.0;     // Velocidad normal
    speechUtterance.pitch = 1.0;    // Tono normal

    // Seleccionar una voz en español si está disponible
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es'));
    if (esVoice) {
        speechUtterance.voice = esVoice;
    }

    speechUtterance.onstart = () => {
        if (onStartCallback) onStartCallback();
    };

    speechUtterance.onend = () => {
        if (onEndCallback) onEndCallback();
    };

    speechUtterance.onerror = (e) => {
        console.error("Error en síntesis de voz:", e);
        if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(speechUtterance);
}

/**
 * Detiene inmediatamente la síntesis de voz en curso.
 */
export function stopSpeaking() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}
