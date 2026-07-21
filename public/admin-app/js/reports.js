/* ==========================================================================
   MÓDULO DE REPORTES COLABORATIVOS: DETECCIÓN DE BARRERAS FÍSICAS
   ========================================================================== */

import { SPACES } from './data.js';
import { updateMapIncidents } from './map.js';

// Base de datos local de incidencias
let incidents = [];

// Incidencias predeterminadas para enriquecer la experiencia de demostración
const INITIAL_INCIDENTS = [
    {
        id: "inc-1",
        floor: "PB",
        spaceId: "meeting-point",
        category: "Piso Resbaladizo",
        description: "Limpieza y encerado en el sector del patio central. Se recomienda transitar con precaución por las bandas antideslizantes.",
        timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString('es-AR'), // hace 2 horas
        status: "Activo"
    },
    {
        id: "inc-2",
        floor: "PB",
        spaceId: "s4-baño-caballeros",
        category: "Baño Inaccesible",
        description: "Problema técnico con el botón de descarga del sanitario en el sector S4. Ya se solicitó servicio técnico oficial, estimado reparar en 24hs.",
        timestamp: new Date(Date.now() - 3600000 * 20).toLocaleString('es-AR'), // hace 20 horas
        status: "Activo"
    }
];

/**
 * Inicializa el sistema colaborativo de reportes.
 */
export function initReports() {
    loadIncidents();

    // 1. Mostrar/Ocultar campo de categoría libre al seleccionar "Otro"
    const categorySelect = document.getElementById('report-category');
    const customCategoryGroup = document.getElementById('report-custom-category-group');
    const customCategoryInput = document.getElementById('report-custom-category');

    categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'Otro') {
            customCategoryGroup.classList.remove('hidden');
            customCategoryInput.setAttribute('required', 'true');
        } else {
            customCategoryGroup.classList.add('hidden');
            customCategoryInput.removeAttribute('required');
        }
    });

    // 2. Procesar el envío del formulario de incidencias
    const form = document.getElementById('report-incident-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const floor = document.getElementById('report-floor').value;
        const spaceId = document.getElementById('report-location').value;
        const category = categorySelect.value;
        const customCategory = customCategoryInput.value;
        const description = document.getElementById('report-description').value;

        // Validar e ingresar
        addNewReport(floor, spaceId, category, customCategory, description);
        
        // Resetear formulario
        form.reset();
        customCategoryGroup.classList.add('hidden');
        customCategoryInput.removeAttribute('required');
    });

    // Actualizar visualizaciones iniciales
    renderReportsList();
    updateMapIncidents(incidents);
}

/**
 * Agrega un nuevo reporte de incidencia de forma colaborativa.
 */
export function addNewReport(floor, spaceId, category, customCategory, description) {
    const finalCategory = category === 'Otro' ? customCategory : category;
    
    const newReport = {
        id: "inc-" + Date.now(),
        floor: floor,
        spaceId: spaceId,
        category: finalCategory,
        description: description,
        timestamp: new Date().toLocaleString('es-AR'),
        status: "Activo"
    };

    incidents.unshift(newReport);
    saveIncidents();

    // Registrar evento de barrera reportada
    if (typeof window.trackVisitorEvent === 'function') {
        window.trackVisitorEvent('barrier_reported', {
            category: finalCategory,
            spaceId: spaceId,
            description: description
        });
    }

    // Actualizar interfaz lateral
    renderReportsList();
    
    // Sincronizar pines en el mapa
    updateMapIncidents(incidents);

    // Anunciar de manera accesible
    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
        announcer.textContent = `Reporte enviado con éxito: ${finalCategory} en ${SPACES[spaceId].name}.`;
    }
}

/**
 * Resuelve y elimina una incidencia activa.
 */
export function resolveReport(reportId) {
    incidents = incidents.filter(i => i.id !== reportId);
    saveIncidents();
    
    renderReportsList();
    updateMapIncidents(incidents);

    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
        announcer.textContent = `La incidencia ha sido marcada como solucionada.`;
    }
}

/**
 * Renderiza dinámicamente la lista de incidencias del sidebar.
 */
export function renderReportsList() {
    const container = document.getElementById('active-reports-list');
    if (!container) return;

    if (incidents.length === 0) {
        container.innerHTML = `<p class="text-center text-muted py-4">No hay incidencias reportadas activas.</p>`;
        return;
    }

    let html = "";
    incidents.forEach(item => {
        const spaceName = SPACES[item.spaceId] ? SPACES[item.spaceId].name : item.spaceId;
        
        html += `
            <div class="report-item" role="listitem">
                <div class="report-item-header">
                    <span class="report-item-title">${item.category}</span>
                    <span class="report-item-floor">${item.floor === 'PB' ? 'PB' : '1P'}</span>
                </div>
                <div class="report-item-desc">
                    <strong>Sector:</strong> ${spaceName}<br>
                    ${item.description}
                </div>
                <div class="report-item-footer">
                    <span>${item.timestamp}</span>
                    <button class="btn-resolve-report" data-id="${item.id}" aria-label="Marcar como solucionada la alerta de ${item.category} en ${spaceName}">
                        Resolver
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Registrar escuchadores de resolución de reportes
    container.querySelectorAll('.btn-resolve-report').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const reportId = e.target.getAttribute('data-id');
            resolveReport(reportId);
        });
    });
}

// --------------------------------------------------------------------------
// PERSISTENCIA LOCALSTORAGE
// --------------------------------------------------------------------------
function saveIncidents() {
    localStorage.setItem('cfp7_active_incidents', JSON.stringify(incidents));
}

function loadIncidents() {
    const raw = localStorage.getItem('cfp7_active_incidents');
    if (raw) {
        try {
            incidents = JSON.parse(raw);
        } catch (e) {
            console.error("Error cargando incidencias de localStorage, restaurando predeterminadas:", e);
            incidents = [...INITIAL_INCIDENTS];
        }
    } else {
        // En primer inicio, inyectar los de demostración
        incidents = [...INITIAL_INCIDENTS];
        saveIncidents();
    }
}
