/* ==========================================================================
   ORQUESTADOR PRINCIPAL: FLUJO DE LA APP, ESTADOS SPA Y PANEL ADMINISTRATIVO
   ========================================================================== */

import { SPACES, SOCIAL_HISTORIES, INITIAL_COURSES, INITIAL_USERS } from './data.js';
import { initMap, changeFloor, selectSpace, drawRoute, clearRoute } from './map.js';
import { findRoute, speakRoute, stopSpeaking } from './router.js';
import { initAccessibility, isVoiceAssistantEnabled } from './accessibility.js';
import { initReports, resolveReport, addNewReport } from './reports.js';
import { initQR } from './qr.js';
import { initMarzipanoViewer, updatePanoScene } from './marzipano-viewer.js';

// Estado global de la aplicación
let activeRoute = null;
let currentSelectedAccess = null;
let currentSelectedDestination = null;
let currentView = 'view-login';
let simulatedMinutes = 600; // 10:00 hs por defecto
let visitorId = '';
let isGoogleUser = false;

// Estado de la Base de Datos en Memoria Local (Administración)
let adminUsers = [];
let adminCourses = [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar sesión de visitante o recuperar guardada
    initVisitorSession();

    // 2. Cargar bases de datos locales para la administración
    loadAdminData();

    // 2.5 Llenar selectores del planificador de rutas y reportes
    populateRouteSelects();

    // 3. Inicializar los visores
    initMap(handleMapSpaceSelection);
    initMarzipanoViewer();
    initAccessibility();
    initReports();
    initQR(handleQRScanned);

    // 4. Configurar el Enrutador de la SPA y Cargar Pantalla Inicial
    setupViewRouter();

    // 5. Configurar Lógica de Selección de Acceso y Simulador de Hora
    setupAccessSelection();

    // 6. Configurar Lógica de Selección de Destino e Historia Social
    setupDestinationSelection();

    // 7. Configurar Pantalla Dividida, Paneo y Orientación Móvil
    setupMainAppInteractions();

    // 8. Inicializar el Panel de Administración (CRUDs y Dashboard)
    setupAdminPanel();

    // Iniciar con la vista de Login
    showView('view-login');
});

// --------------------------------------------------------------------------
// 1. GESTIÓN DE SESIÓN DE VISITANTE Y EVENTOS (MÉTRICAS)
// --------------------------------------------------------------------------
function initVisitorSession() {
    let savedId = localStorage.getItem('cfp7_visitor_id');
    if (!savedId) {
        savedId = `VISITANTE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        localStorage.setItem('cfp7_visitor_id', savedId);
    }
    visitorId = savedId;
}

/**
 * Registra un evento de interacción del usuario en localStorage para métricas.
 */
function trackVisitorEvent(eventName, details = {}) {
    // Si el usuario actual es administrador en el panel, no registrar métricas de navegación
    if (currentView === 'view-admin') return;

    const eventsJson = localStorage.getItem('cfp7_visitor_events') || '[]';
    let events = [];
    try {
        events = JSON.parse(eventsJson);
    } catch (e) {
        events = [];
    }

    const newEvent = {
        id: Date.now(),
        visitorId: visitorId,
        userType: isGoogleUser ? 'Google' : 'Visitante',
        event: eventName,
        details: details,
        timestamp: new Date().toLocaleString('es-AR')
    };

    events.unshift(newEvent); // Más reciente primero
    localStorage.setItem('cfp7_visitor_events', JSON.stringify(events));

    // Actualizar estadísticas rápidas agregadas
    if (eventName === 'Inicio de navegación' || eventName === 'navigation_started') {
        const pref = details.preference || details.preferencia || 'standard';
        if (pref === 'accessible') {
            let count = parseInt(localStorage.getItem('stats_routes_accessible') || '0');
            localStorage.setItem('stats_routes_accessible', (count + 1).toString());
        } else {
            let count = parseInt(localStorage.getItem('stats_routes_standard') || '0');
            localStorage.setItem('stats_routes_standard', (count + 1).toString());
        }
    } else if (eventName === 'Escaneo QR de ubicación' || eventName === 'qr_scanned') {
        let count = parseInt(localStorage.getItem('stats_qr_scans') || '0');
        localStorage.setItem('stats_qr_scans', (count + 1).toString());
    }
}

// Exponer globalmente para reports.js y otros módulos
window.trackVisitorEvent = trackVisitorEvent;

// --------------------------------------------------------------------------
// 2. ENRUTADOR VISTAS SPA
// --------------------------------------------------------------------------
function setupViewRouter() {
    // Configurar botones de login
    document.getElementById('btn-login-visitor').addEventListener('click', () => {
        isGoogleUser = false;
        loadGoogleUserData(); // Ocultar panel de Google
        trackVisitorEvent('access_selected', { method: 'Visitor' });
        showView('view-access');
    });

    document.getElementById('btn-login-google').addEventListener('click', () => {
        isGoogleUser = true;
        loadGoogleUserData(); // Mostrar panel de Google
        trackVisitorEvent('access_selected', { method: 'Google' });
        
        // Simular inicio de sesión exitoso y mostrar toast
        showGoogleLoginToast();
        showView('view-access');
    });

    // Toggle formulario de admin
    const adminToggleBtn = document.getElementById('btn-login-admin-toggle');
    const adminForm = document.getElementById('admin-login-form');
    adminToggleBtn.addEventListener('click', () => {
        adminForm.classList.toggle('active');
        if (adminForm.classList.contains('active')) {
            document.getElementById('admin-user').focus();
        }
    });

    // Formulario de login de admin (Protegido y robusto)
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const user = document.getElementById('admin-user').value.trim();
            const pass = document.getElementById('admin-pass').value.trim();
            const errorMsg = document.getElementById('admin-login-error');

            console.log("Admin Login Attempt:", { user, pass });

            // Validar credenciales de forma robusta e insensible a mayúsculas/minúsculas y estados en inglés/español
            let foundUser = null;
            if (Array.isArray(adminUsers)) {
                foundUser = adminUsers.find(u => 
                    u && 
                    typeof u.username === 'string' && 
                    u.username.toLowerCase() === user.toLowerCase() && 
                    typeof u.status === 'string' && 
                    (u.status.toLowerCase() === 'activo' || u.status.toLowerCase() === 'active')
                );
            }
            
            console.log("Matched user in local DB:", foundUser);

            // Credenciales por defecto: admin / admin123
            if ((user.toLowerCase() === 'admin' && pass === 'admin') || (foundUser && pass === 'admin')) {
                console.log("Login successful! Redirecting to admin panel...");
                errorMsg.classList.add('hidden');
                adminForm.reset();
                adminForm.classList.remove('active');
                
                trackVisitorEvent('Ingreso como administrador', { usuario: user });
                showView('view-admin');
            } else {
                console.warn("Login failed! Invalid credentials.");
                errorMsg.textContent = "Credenciales inválidas. Intente con admin / admin.";
                errorMsg.classList.remove('hidden');
            }
        } catch (error) {
            console.error("Error en submit handler de login:", error);
            const errorMsg = document.getElementById('admin-login-error');
            if (errorMsg) {
                errorMsg.textContent = "Error al iniciar sesión. Restableciendo base de datos...";
                errorMsg.classList.remove('hidden');
            }
            // Auto-heal local storage y recargar en caso de corrupción crítica
            localStorage.removeItem('cfp7_admin_users');
            loadAdminData();
        }
    });
}

function showView(viewId) {
    currentView = viewId;

    // Ocultar todas las vistas
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });

    // Mostrar la vista objetivo
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active');
    }

    // Acciones especiales al cambiar de pantalla
    if (viewId === 'view-app') {
        // Asegurar que el mapa y el Marzipano estén sincronizados
        setTimeout(() => {
            changeFloor('PB');
            if (currentSelectedDestination) {
                updatePanoScene(currentSelectedDestination);
            } else if (currentSelectedAccess) {
                const startSpaceId = currentSelectedAccess === 'ramsay' ? 'entrance-ramsay' : 'entrance-dragones';
                updatePanoScene(startSpaceId);
            }
        }, 100);
    } else if (viewId === 'view-admin') {
        refreshAdminDashboard();
        refreshAdminUsersTable();
        refreshAdminCoursesTable();
        refreshAdminBarriersTable();
    }
}

function showGoogleLoginToast() {
    let toast = document.getElementById('google-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'google-toast';
        toast.style.position = 'fixed';
        toast.style.top = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'var(--primary)';
        toast.style.color = '#ffffff';
        toast.style.padding = '14px 28px';
        toast.style.borderRadius = '30px';
        toast.style.boxShadow = 'var(--shadow-lg)';
        toast.style.zIndex = '9999';
        toast.style.fontWeight = '700';
        toast.style.fontSize = '0.9rem';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `👋 ¡Bienvenido! Autenticado con Google exitosamente.`;
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// --------------------------------------------------------------------------
// 3. LÓGICA DE SELECCIÓN DE ACCESO Y SIMULADOR DE HORA
// --------------------------------------------------------------------------
function setupAccessSelection() {
    const slider = document.getElementById('time-simulation-slider');
    const timeDisplay = document.getElementById('simulated-time-display');

    // Manejar cambios en el control de tiempo deslizante
    slider.addEventListener('input', (e) => {
        simulatedMinutes = parseInt(e.target.value);
        updateSimulatedTime(simulatedMinutes);
    });

    // Inicializar visualización del tiempo
    updateSimulatedTime(600);

    // Clicks en tarjetas de acceso
    document.getElementById('access-card-ramsay').addEventListener('click', () => {
        if (isAccessOpen('ramsay', simulatedMinutes)) {
            selectAccess('ramsay');
        }
    });

    document.getElementById('access-card-dragones').addEventListener('click', () => {
        if (isAccessOpen('dragones', simulatedMinutes)) {
            selectAccess('dragones');
        }
    });
}

function updateSimulatedTime(minutes) {
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mm = String(minutes % 60).padStart(2, '0');
    document.getElementById('simulated-time-display').textContent = `${hh}:${mm} hs`;

    // Actualizar estados visuales de las tarjetas de acceso
    checkAccessCardAvailability('ramsay', minutes, 'access-card-ramsay');
    checkAccessCardAvailability('dragones', minutes, 'access-card-dragones');
}

function isAccessOpen(access, minutes) {
    if (access === 'ramsay') {
        // Ramsay de 08:00 (480 mins) a 22:00 (1320 mins)
        return minutes >= 480 && minutes <= 1320;
    } else if (access === 'dragones') {
        // Dragones de 08:00 (480 mins) a 18:00 (1080 mins)
        return minutes >= 480 && minutes <= 1080;
    }
    return false;
}

function checkAccessCardAvailability(access, minutes, cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const isOpen = isAccessOpen(access, minutes);
    const badge = card.querySelector('.access-indicator-badge');
    const dot = card.querySelector('.access-indicator-dot');
    const text = card.querySelector('.access-status-text');

    if (isOpen) {
        card.classList.remove('closed');
        badge.style.background = 'rgba(16, 185, 129, 0.1)';
        badge.style.color = 'var(--accent)';
        dot.style.background = 'var(--accent)';
        text.textContent = 'Disponible';
    } else {
        card.classList.add('closed');
        badge.style.background = 'rgba(148, 163, 184, 0.1)';
        badge.style.color = '#64748b';
        dot.style.background = '#64748b';
        text.textContent = 'Cerrado actualmente';
    }
}

function selectAccess(access) {
    currentSelectedAccess = access;
    trackVisitorEvent('access_selected', { entrance: access, simulatedTime: document.getElementById('simulated-time-display').textContent });

    // Configurar automáticamente el punto de origen en el desplegable de la app
    const startSelect = document.getElementById('route-start');
    if (access === 'ramsay') {
        startSelect.value = 'entrance-ramsay';
    } else {
        startSelect.value = 'entrance-dragones';
    }

    // Ir a la selección de Destino
    showView('view-destination');
}

// --------------------------------------------------------------------------
// 4. SELECCIÓN DE DESTINO E HISTORIA SOCIAL
// --------------------------------------------------------------------------
function setupDestinationSelection() {
    // Botón volver
    document.getElementById('btn-destination-back').addEventListener('click', () => {
        showView('view-access');
    });

    // Botón volver de historia social
    const socialStoryBackBtn = document.getElementById('btn-social-story-back');
    if (socialStoryBackBtn) {
        socialStoryBackBtn.addEventListener('click', () => {
            showView('view-destination');
        });
    }

    // Clicks en tarjetas de sector/categoría
    const destCards = document.querySelectorAll('.destination-card');
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            // Quitar clase activa previa
            destCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const sector = card.getAttribute('data-sector');
            const category = card.getAttribute('data-category');

            if (sector) {
                displayDestinationSpaces(sector, 'sector');
            } else if (category) {
                displayDestinationSpaces(category, 'category');
            }
        });
    });

    // Botón de confirmar recorrido desde la historia social
    document.getElementById('btn-social-history-go').addEventListener('click', () => {
        if (!currentSelectedDestination) return;

        // Fijar destino final en la pantalla de la App
        document.getElementById('route-end').value = currentSelectedDestination;

        trackVisitorEvent('route_started', { 
            origin: document.getElementById('route-start').value,
            destination: currentSelectedDestination 
        });

        // Cambiar a la vista del mapa/app
        showView('view-app');

        // Calcular la ruta inmediatamente
        calculateActiveRoute();
    });
}

function displayDestinationSpaces(filterVal, filterType) {
    const listPanel = document.getElementById('spaces-list-panel');
    const container = document.getElementById('spaces-list-container');
    const title = document.getElementById('spaces-panel-title');

    if (!listPanel || !container || !title) return;

    // Buscar espacios que coincidan
    let matchedSpaces = [];
    if (filterType === 'sector') {
        title.textContent = `Espacios en el ${filterVal}`;
        matchedSpaces = Object.values(SPACES).filter(s => s.sector === filterVal);
        trackVisitorEvent('sector_selected', { sector: filterVal });
    } else {
        title.textContent = `Resultados: Categoría`;
        matchedSpaces = Object.values(SPACES).filter(s => s.type === filterVal || (filterVal === 'toilet-accessible' && s.type === 'toilet-accessible') || (filterVal === 'toilet' && s.type === 'toilet'));
        trackVisitorEvent('sector_selected', { sector: `Filtro Categoría: ${filterVal}` });
    }

    // Renderizar
    container.innerHTML = '';
    if (matchedSpaces.length === 0) {
        container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">No hay espacios cargados para este criterio.</p>`;
    } else {
        matchedSpaces.forEach(space => {
            const item = document.createElement('div');
            item.className = 'space-selector-item';
            item.setAttribute('data-id', space.id);
            
            const accIcon = space.isAccessible ? '♿' : '⚠️';
            item.innerHTML = `
                <span>${space.name}</span>
                <span class="space-item-acc-indicator">${accIcon}</span>
            `;

            item.addEventListener('click', () => {
                // Seleccionar visualmente
                container.querySelectorAll('.space-selector-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');

                loadSocialHistory(space.id);
            });

            container.appendChild(item);
        });
    }

    listPanel.classList.remove('hidden');
}

function loadSocialHistory(spaceId) {
    const space = SPACES[spaceId];
    if (!space) return;

    currentSelectedDestination = spaceId;
    trackVisitorEvent('destination_selected', { spaceId: spaceId, name: space.name });
    trackVisitorEvent('social_story_viewed', { spaceId: spaceId, name: space.name });

    const card = document.getElementById('social-history-card');

    // Cargar datos
    document.getElementById('social-history-title').textContent = space.name;
    document.getElementById('social-history-photo').src = space.photo;

    // Buscar reglas específicas de anticipación
    const rulesList = document.getElementById('social-history-rules-list');
    rulesList.innerHTML = '';

    const historyData = SOCIAL_HISTORIES[spaceId];
    if (historyData && historyData.rules && historyData.rules.length > 0) {
        historyData.rules.forEach(rule => {
            const li = document.createElement('li');
            li.className = 'social-history-item';
            li.innerHTML = `
                <span class="social-history-item-bullet">✓</span>
                <span>${rule}</span>
            `;
            rulesList.appendChild(li);
        });
    } else {
        // Reglas genéricas
        const genericRules = [
            "Transitar por el pasillo derecho de forma ordenada.",
            "Mantener la higiene del sector.",
            "Respetar las indicaciones visuales y cartelería.",
            "Consultar al docente o bedel ante cualquier duda."
        ];
        genericRules.forEach(rule => {
            const li = document.createElement('li');
            li.className = 'social-history-item';
            li.innerHTML = `
                <span class="social-history-item-bullet">✓</span>
                <span>${rule}</span>
            `;
            rulesList.appendChild(li);
        });
    }

    if (card) {
        card.classList.remove('hidden');
    }

    // Mostrar la vista de la historia social en pantalla completa
    showView('view-social-story');
}

// --------------------------------------------------------------------------
// 5. INTERACCIONES EN PANTALLA PRINCIPAL (PANEOS, MAPA, ORIENTACIÓN)
// --------------------------------------------------------------------------
function setupMainAppInteractions() {
    // Escuchar cambios de tamaño/orientación para móviles
    window.addEventListener('resize', handleMobileOrientation);
    handleMobileOrientation(); // Ejecutar inicial

    // Vincular botones de Pestañas del Sidebar (Recorrido, Incidencias, Información)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetTabId = btn.getAttribute('data-tab');
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            const targetPanel = document.getElementById(targetTabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Vincular botones del planificador de rutas
    const calcRouteBtn = document.getElementById('calculate-route-btn');
    if (calcRouteBtn) {
        calcRouteBtn.addEventListener('click', calculateActiveRoute);
    }

    const clearRouteBtn = document.getElementById('clear-route-btn');
    if (clearRouteBtn) {
        clearRouteBtn.addEventListener('click', resetActiveRoute);
    }

    const swapLocBtn = document.getElementById('swap-locations-btn');
    if (swapLocBtn) {
        swapLocBtn.addEventListener('click', () => {
            const startSelect = document.getElementById('route-start');
            const endSelect = document.getElementById('route-end');
            const temp = startSelect.value;
            startSelect.value = endSelect.value;
            endSelect.value = temp;

            if (startSelect.value && endSelect.value) {
                calculateActiveRoute();
            } else {
                resetActiveRoute();
            }
        });
    }

    // Vincular botones de la Ficha de Información de Espacio
    const setStartBtn = document.getElementById('set-as-start-btn');
    if (setStartBtn) {
        setStartBtn.addEventListener('click', () => {
            const activeSpaceId = document.getElementById('space-title').getAttribute('data-active-id');
            if (activeSpaceId) {
                document.getElementById('route-start').value = activeSpaceId;
                document.getElementById('space-info-card').classList.add('hidden');
                document.getElementById('nav-empty-state').classList.remove('hidden');
                if (document.getElementById('route-end').value) {
                    calculateActiveRoute();
                }
            }
        });
    }

    const setEndBtn = document.getElementById('set-as-end-btn');
    if (setEndBtn) {
        setEndBtn.addEventListener('click', () => {
            const activeSpaceId = document.getElementById('space-title').getAttribute('data-active-id');
            if (activeSpaceId) {
                document.getElementById('route-end').value = activeSpaceId;
                document.getElementById('space-info-card').classList.add('hidden');
                document.getElementById('nav-empty-state').classList.remove('hidden');
                if (document.getElementById('route-start').value) {
                    calculateActiveRoute();
                }
            }
        });
    }

    const closeSpaceCardBtn = document.getElementById('close-space-card');
    if (closeSpaceCardBtn) {
        closeSpaceCardBtn.addEventListener('click', () => {
            document.getElementById('space-info-card').classList.add('hidden');
            document.getElementById('nav-empty-state').classList.remove('hidden');
        });
    }

    // Vincular altavoz TTS de indicaciones
    const ttsSpeakBtn = document.getElementById('tts-speak-route-btn');
    if (ttsSpeakBtn) {
        ttsSpeakBtn.addEventListener('click', toggleSpeechReading);
    }

    // Configurar buscador de espacios en el sidebar
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    if (searchInput && searchResults && clearSearchBtn) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
                clearSearchBtn.classList.add('hidden');
                return;
            }

            clearSearchBtn.classList.remove('hidden');

            const matched = Object.values(SPACES).filter(space => 
                space.name.toLowerCase().includes(query) || 
                space.description.toLowerCase().includes(query) ||
                space.sector.toLowerCase().includes(query)
            );

            if (matched.length === 0) {
                searchResults.innerHTML = `<div class="search-result-item" style="cursor: default; color: var(--text-muted);">No se encontraron resultados</div>`;
            } else {
                searchResults.innerHTML = '';
                matched.forEach(space => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.setAttribute('role', 'option');
                    item.innerHTML = `
                        <span class="result-title">${space.name}</span>
                        <span class="result-subtitle">${space.sector} - ${space.floorLabel}</span>
                    `;
                    item.addEventListener('click', () => {
                        searchInput.value = space.name;
                        searchResults.classList.add('hidden');
                        
                        // Seleccionar en mapa
                        selectSpace(space.id);
                        // Mostrar info
                        handleMapSpaceSelection(space.id);
                    });
                    searchResults.appendChild(item);
                });
            }
            searchResults.classList.remove('hidden');
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
            clearSearchBtn.classList.add('hidden');
            searchInput.focus();
        });

        // Ocultar resultados al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    // Vincular botón flotante de reportar barrera
    document.getElementById('btn-floating-report').addEventListener('click', () => {
        // Alternar a la tab de Reportes en el Sidebar
        document.querySelector('.tab-btn[data-tab="tab-reports"]').click();
        
        // Poner el foco en el formulario
        document.getElementById('report-location').focus();
    });

    // Inyectar el botón de llegada ("Llegué a destino") en las indicaciones
    const routeDirections = document.getElementById('route-directions-card');
    
    // Crear el botón si no existe
    let arriveBtn = document.getElementById('btn-arrive-destination');
    if (!arriveBtn) {
        arriveBtn = document.createElement('button');
        arriveBtn.id = 'btn-arrive-destination';
        arriveBtn.className = 'btn btn-primary w-full mt-4';
        arriveBtn.style.background = 'var(--accent)';
        arriveBtn.style.color = '#ffffff';
        arriveBtn.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
        arriveBtn.textContent = '🏆 ¡He llegado a destino!';
        
        arriveBtn.addEventListener('click', () => {
            showArrivalFeedback();
        });
        
        routeDirections.appendChild(arriveBtn);
    }

    // Vincular botón para favoritos
    const favBtn = document.getElementById('btn-favorite-toggle');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            const activeSpaceId = document.getElementById('space-title').getAttribute('data-active-id');
            if (activeSpaceId) {
                toggleFavoriteSpace(activeSpaceId);
            }
        });
    }

    // Iniciar navegación desde la vista previa
    const startNavBtn = document.getElementById('btn-start-navigation');
    if (startNavBtn) {
        startNavBtn.addEventListener('click', startActiveNavigation);
    }

    // Vincular guardar preferencia de accesibilidad al cambiar
    document.querySelectorAll('input[name="route-pref"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (isGoogleUser) {
                localStorage.setItem('cfp7_google_pref', e.target.value);
            }
        });
    });

    // Vincular botones de llegada / feedback
    const btnArrivalEnter = document.getElementById('btn-arrival-enter');
    if (btnArrivalEnter) {
        btnArrivalEnter.addEventListener('click', () => {
            document.getElementById('arrival-feedback-card').classList.add('hidden');
            const endId = document.getElementById('route-end').value;
            resetActiveRoute();
            showView('view-destination');
            if (endId) {
                // Ir a la ficha del espacio destino
                setTimeout(() => {
                    displayDestinationSpaces(SPACES[endId].sector, 'sector');
                    loadSocialHistory(endId);
                }, 100);
            }
        });
    }

    const btnArrivalInfo = document.getElementById('btn-arrival-info');
    if (btnArrivalInfo) {
        btnArrivalInfo.addEventListener('click', () => {
            document.getElementById('arrival-feedback-card').classList.add('hidden');
            const endId = document.getElementById('route-end').value;
            if (endId) {
                handleMapSpaceSelection(endId);
                selectSpace(endId); // highlight it in map
            }
        });
    }

    const btnArrivalHelp = document.getElementById('btn-arrival-help');
    if (btnArrivalHelp) {
        btnArrivalHelp.addEventListener('click', () => {
            alert("⚠️ Asistencia de Orientación:\nUn tutor o personal del CFP N°7 ha sido notificado y acudirá a tu ubicación en unos instantes. Por favor, permanece donde estás.");
        });
    }

    const btnSurveyYes = document.getElementById('btn-survey-yes');
    if (btnSurveyYes) {
        btnSurveyYes.addEventListener('click', () => {
            trackVisitorEvent('navigation_completed', { reached: true });
            alert("👍 ¡Gracias por tu confirmación! Nos alegra que hayas llegado bien.");
            document.getElementById('arrival-feedback-card').classList.add('hidden');
            resetActiveRoute();
            showView('view-destination');
        });
    }

    const btnSurveyNo = document.getElementById('btn-survey-no');
    if (btnSurveyNo) {
        btnSurveyNo.addEventListener('click', () => {
            trackVisitorEvent('navigation_completed', { reached: false });
            alert("👎 Lamentamos que hayas tenido inconvenientes. Hemos notificado al área de accesibilidad para revisar este trayecto.");
            document.getElementById('arrival-feedback-card').classList.add('hidden');
            resetActiveRoute();
            showView('view-destination');
        });
    }
}

function handleMobileOrientation() {
    const splitContainer = document.querySelector('.split-viewport-container');
    if (!splitContainer) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        splitContainer.classList.remove('orientation-vertical', 'orientation-horizontal');
        return;
    }

    // Comprobar orientación en móvil
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
        splitContainer.classList.remove('orientation-horizontal');
        splitContainer.classList.add('orientation-vertical'); // Modo Espejo (Marzipano)
    } else {
        splitContainer.classList.remove('orientation-vertical');
        splitContainer.classList.add('orientation-horizontal'); // Modo Tray (Mapa SVG)
    }
}

// --------------------------------------------------------------------------
// CALLBACK SELECCIÓN MAPA E INTEGRACIÓN QR
// --------------------------------------------------------------------------
function handleMapSpaceSelection(spaceId) {
    if (!spaceId) return;

    // Actualizar Marzipano de forma interactiva
    updatePanoScene(spaceId);

    // Trackear visualización contextual
    trackVisitorEvent('destination_selected', { spaceId: spaceId, name: SPACES[spaceId].name });

    // Mostrar detalles en el panel izquierdo (Ficha)
    const space = SPACES[spaceId];
    if (space) {
        // Cargar Datos en la Ficha
        const title = document.getElementById('space-title');
        title.textContent = space.name;
        title.setAttribute('data-active-id', space.id);

        document.getElementById('space-subtitle').textContent = `${space.sector} - ${space.floorLabel}`;
        document.getElementById('space-photo').src = space.photo;
        
        const accLabel = document.getElementById('space-acc-status');
        if (space.isAccessible) {
            accLabel.textContent = "Accesible ♿";
            accLabel.style.color = "var(--accent)";
        } else {
            accLabel.textContent = "No Adaptado ⚠️";
            accLabel.style.color = "var(--danger)";
        }

        document.getElementById('space-nearest-toilet').textContent = space.nearestToilet;
        document.getElementById('space-description').textContent = space.description;

        // Inicializar estado del botón de favoritos
        const starBtn = document.getElementById('btn-favorite-toggle');
        if (starBtn) {
            if (isGoogleUser) {
                const favsJson = localStorage.getItem('cfp7_google_favorites') || '[]';
                let favs = [];
                try { favs = JSON.parse(favsJson); } catch(e) {}
                if (favs.includes(spaceId)) {
                    starBtn.classList.add('active');
                } else {
                    starBtn.classList.remove('active');
                }
                starBtn.style.display = 'block';
            } else {
                starBtn.classList.remove('active');
                starBtn.style.display = 'block';
            }
        }

        // Ocultar e empty states
        document.getElementById('nav-empty-state').classList.add('hidden');
        document.getElementById('route-directions-card').classList.add('hidden');
        document.getElementById('space-info-card').classList.remove('hidden');
    }
}

function handleQRScanned(scannedSpaceId) {
    trackVisitorEvent('qr_scanned', { spaceId: scannedSpaceId, name: SPACES[scannedSpaceId].name });
    
    // El callback en QR.js ya reubica el origen del selector y la ficha. Sincronizar Marzipano
    updatePanoScene(scannedSpaceId);
}

// --------------------------------------------------------------------------
// CÁLCULO DE RUTA COMPLEMENTO (VOZ Y REGISTRO)
// --------------------------------------------------------------------------
function calculateActiveRoute() {
    const startId = document.getElementById('route-start').value;
    const endId = document.getElementById('route-end').value;

    if (!startId || !endId) {
        alert("Por favor, seleccione un punto de origen y un destino.");
        return;
    }

    if (startId === endId) {
        alert("El punto de origen y destino no pueden ser el mismo.");
        return;
    }

    const isAccessiblePref = document.querySelector('input[name="route-pref"]:checked').value === 'accessible';

    // Calcular Ruta
    const route = findRoute(startId, endId, isAccessiblePref);

    if (!route) {
        alert("No se encontró un camino válido con las preferencias seleccionadas.");
        return;
    }

    activeRoute = route;
    
    // REGISTRAR EVENTO DE RUTA INICIADA (route_started)
    trackVisitorEvent('route_started', {
        origin: SPACES[startId].name,
        destination: SPACES[endId].name,
        preference: isAccessiblePref ? 'accessible' : 'standard',
        distanceMeters: Math.round(route.distance / 10)
    });

    // Ocultar ficha y paneles
    document.getElementById('nav-empty-state').classList.add('hidden');
    document.getElementById('space-info-card').classList.add('hidden');
    document.getElementById('route-directions-card').classList.add('hidden');
    document.getElementById('arrival-feedback-card').classList.add('hidden');

    // Calcular distancia y tiempo
    const distanceMeters = Math.round(route.distance / 10);
    const timeMins = Math.ceil(distanceMeters / 80);

    // Llenar card de Vista Previa
    document.getElementById('route-preview-distance').textContent = `${distanceMeters} metros`;
    document.getElementById('route-preview-time').textContent = `${timeMins} min aprox.`;
    document.getElementById('route-preview-type').textContent = isAccessiblePref ? "Accesible ♿" : "Estándar";

    // Mostrar card de Vista Previa
    document.getElementById('route-preview-card').classList.remove('hidden');

    // Dibujar en SVG
    drawRoute(route);

    // Iniciar Marzipano en el origen del recorrido
    updatePanoScene(startId);

    // Asegurar que el botón de limpiar ruta sea visible
    document.getElementById('clear-route-btn').classList.remove('hidden');
}

function startActiveNavigation() {
    if (!activeRoute) return;

    const startId = document.getElementById('route-start').value;
    const endId = document.getElementById('route-end').value;
    const isAccessiblePref = document.querySelector('input[name="route-pref"]:checked').value === 'accessible';

    // Ocultar Vista Previa
    document.getElementById('route-preview-card').classList.add('hidden');

    // REGISTRAR EVENTO DE INICIO DE NAVEGACIÓN (navigation_started)
    trackVisitorEvent('navigation_started', {
        origin: SPACES[startId].name,
        destination: SPACES[endId].name,
        preference: isAccessiblePref ? 'accessible' : 'standard',
        distanceMeters: Math.round(activeRoute.distance / 10)
    });

    // Llenar panel de direcciones
    document.getElementById('route-summary-distance').textContent = `${Math.round(activeRoute.distance / 10)} metros aprox.`;
    document.getElementById('route-summary-type').textContent = isAccessiblePref ? "Accesible ♿" : "Estándar";
    
    const stepsList = document.getElementById('directions-list');
    stepsList.innerHTML = "";
    
    activeRoute.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.setAttribute('data-step', idx + 1);
        li.innerHTML = step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (isAccessiblePref) {
            li.classList.add('step-accessible');
        }
        stepsList.appendChild(li);
    });

    // Anuncio auditivo accesible
    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
        announcer.textContent = `Navegación iniciada de ${SPACES[startId].name} a ${SPACES[endId].name}. Distancia aproximada ${Math.round(activeRoute.distance / 10)} metros. Siga las indicaciones.`;
    }

    // Mostrar panel de guiado
    document.getElementById('route-directions-card').classList.remove('hidden');

    if (isVoiceAssistantEnabled()) {
        speakRouteDirections();
    }
}

function showArrivalFeedback() {
    stopSpeaking();
    handleSpeechEnd();

    const startId = document.getElementById('route-start').value;
    const endId = document.getElementById('route-end').value;

    // Registrar evento de confirmación de llegada (arrival_confirmed)
    trackVisitorEvent('arrival_confirmed', {
        origin: startId ? SPACES[startId].name : '',
        destination: endId ? SPACES[endId].name : ''
    });

    // Guardar en el historial de Google si corresponde
    if (isGoogleUser && startId && endId) {
        addRouteToGoogleHistory(startId, endId);
    }

    // Ocultar card de guiado
    document.getElementById('route-directions-card').classList.add('hidden');
    document.getElementById('clear-route-btn').classList.add('hidden');

    // Mostrar card de llegada
    document.getElementById('arrival-feedback-card').classList.remove('hidden');
}

function resetActiveRoute() {
    activeRoute = null;
    clearRoute();
    stopSpeaking();

    document.getElementById('route-start').value = "";
    document.getElementById('route-end').value = "";
    document.getElementById('route-preview-card').classList.add('hidden');
    document.getElementById('route-directions-card').classList.add('hidden');
    document.getElementById('arrival-feedback-card').classList.add('hidden');
    document.getElementById('clear-route-btn').classList.add('hidden');
    document.getElementById('nav-empty-state').classList.remove('hidden');
}

// --------------------------------------------------------------------------
// 6. PANEL ADMINISTRATIVO (CRUD, REPORTES Y DASHBOARD)
// --------------------------------------------------------------------------
function loadAdminData() {
    // Cargar Cursos
    const coursesRaw = localStorage.getItem('cfp7_admin_courses');
    if (coursesRaw) {
        try {
            const parsed = JSON.parse(coursesRaw);
            if (Array.isArray(parsed)) {
                adminCourses = parsed;
            } else {
                adminCourses = [...INITIAL_COURSES];
                localStorage.setItem('cfp7_admin_courses', JSON.stringify(adminCourses));
            }
        } catch (e) {
            adminCourses = [...INITIAL_COURSES];
            localStorage.setItem('cfp7_admin_courses', JSON.stringify(adminCourses));
        }
    } else {
        adminCourses = [...INITIAL_COURSES];
        localStorage.setItem('cfp7_admin_courses', JSON.stringify(adminCourses));
    }

    // Cargar Usuarios (Con auto-healing de robustez para evitar bloqueos)
    const usersRaw = localStorage.getItem('cfp7_admin_users');
    if (usersRaw) {
        try {
            const parsed = JSON.parse(usersRaw);
            if (Array.isArray(parsed)) {
                adminUsers = parsed;
                // Asegurar que el administrador por defecto exista y esté activo
                const hasAdmin = adminUsers.some(u => u && u.username && u.username.toLowerCase() === 'admin');
                if (!hasAdmin) {
                    adminUsers.push({
                        username: "admin",
                        fullName: "Director de Gestión CFP7",
                        role: "Administrador",
                        status: "Activo"
                    });
                    localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
                }
                // Normalizar estados ("Active" -> "Activo")
                let updated = false;
                adminUsers.forEach(u => {
                    if (u && typeof u.status === 'string' && u.status.toLowerCase() === 'active') {
                        u.status = 'Activo';
                        updated = true;
                    }
                });
                if (updated) {
                    localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
                }
            } else {
                adminUsers = [...INITIAL_USERS];
                localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
            }
        } catch (e) {
            console.error("Error al parsear usuarios locales:", e);
            adminUsers = [...INITIAL_USERS];
            localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
        }
    } else {
        adminUsers = [...INITIAL_USERS];
        localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
    }
}

function setupAdminPanel() {
    // Logout Admin
    document.getElementById('btn-admin-logout').addEventListener('click', () => {
        showView('view-login');
    });

    document.getElementById('btn-admin-back-app').addEventListener('click', () => {
        showView('view-app');
    });

    // Pestañas del Panel Lateral Administrativo
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Actualizar el título principal
            const titleDisplay = document.getElementById('admin-panel-title-display');
            if (targetId === 'admin-panel-dashboard') titleDisplay.textContent = 'Dashboard Administrativo';
            if (targetId === 'admin-panel-users') titleDisplay.textContent = 'Gestión de Usuarios';
            if (targetId === 'admin-panel-courses') titleDisplay.textContent = 'Gestión de Cursos Académicos';
            if (targetId === 'admin-panel-barriers') titleDisplay.textContent = 'Obstáculos e Incidencias';
        });
    });

    // BUSCADORES ADMINISTRATIVOS
    document.getElementById('admin-users-search').addEventListener('input', refreshAdminUsersTable);
    document.getElementById('admin-courses-search').addEventListener('input', refreshAdminCoursesTable);
    document.getElementById('admin-barriers-search').addEventListener('input', refreshAdminBarriersTable);

    // MODAL USUARIOS
    const userModal = document.getElementById('admin-user-modal');
    document.getElementById('btn-admin-add-user').addEventListener('click', () => {
        document.getElementById('user-modal-title').textContent = 'Crear Nuevo Usuario';
        document.getElementById('user-form-mode').value = 'create';
        document.getElementById('user-form-username').value = '';
        document.getElementById('user-form-username').removeAttribute('readonly');
        document.getElementById('user-form-fullname').value = '';
        document.getElementById('user-form-role').value = 'Docente';
        document.getElementById('user-form-status').value = 'Activo';
        
        userModal.classList.remove('hidden');
        document.getElementById('user-form-username').focus();
    });

    document.getElementById('close-user-modal-btn').addEventListener('click', () => userModal.classList.add('hidden'));
    document.getElementById('btn-cancel-user-modal').addEventListener('click', () => userModal.classList.add('hidden'));

    document.getElementById('admin-user-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.getElementById('user-form-mode').value;
        const username = document.getElementById('user-form-username').value.trim();
        const fullName = document.getElementById('user-form-fullname').value.trim();
        const role = document.getElementById('user-form-role').value;
        const status = document.getElementById('user-form-status').value;

        if (mode === 'create') {
            // Validar que no exista
            if (adminUsers.some(u => u.username === username)) {
                alert("El nombre de usuario ya existe.");
                return;
            }
            adminUsers.push({ username, fullName, role, status });
        } else {
            // Edit
            const uIdx = adminUsers.findIndex(u => u.username === username);
            if (uIdx !== -1) {
                adminUsers[uIdx] = { username, fullName, role, status };
            }
        }

        localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
        userModal.classList.add('hidden');
        refreshAdminUsersTable();
        refreshAdminDashboard();
    });

    // MODAL CURSOS
    const courseModal = document.getElementById('admin-course-modal');
    const sectorFormSelect = document.getElementById('course-form-sector');
    const spaceFormSelect = document.getElementById('course-form-space');

    // Cargar dinámicamente espacios según sector en el modal de cursos
    sectorFormSelect.addEventListener('change', () => {
        populateCourseModalSpaces(sectorFormSelect.value);
    });

    document.getElementById('btn-admin-add-course').addEventListener('click', () => {
        document.getElementById('course-modal-title').textContent = 'Crear Nuevo Curso';
        document.getElementById('course-form-mode').value = 'create';
        document.getElementById('course-form-id').value = '';
        document.getElementById('course-form-name').value = '';
        document.getElementById('course-form-schedule').value = '';
        document.getElementById('course-form-teacher').value = '';
        document.getElementById('course-form-status').value = 'Activo';
        
        sectorFormSelect.value = 'Sector S1';
        populateCourseModalSpaces('Sector S1');

        courseModal.classList.remove('hidden');
        document.getElementById('course-form-name').focus();
    });

    document.getElementById('close-course-modal-btn').addEventListener('click', () => courseModal.classList.add('hidden'));
    document.getElementById('btn-cancel-course-modal').addEventListener('click', () => courseModal.classList.add('hidden'));

    document.getElementById('admin-course-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.getElementById('course-form-mode').value;
        const id = document.getElementById('course-form-id').value || `cur-${Date.now()}`;
        const name = document.getElementById('course-form-name').value.trim();
        const sector = sectorFormSelect.value;
        const spaceId = spaceFormSelect.value;
        const schedule = document.getElementById('course-form-schedule').value.trim();
        const teacher = document.getElementById('course-form-teacher').value.trim();
        const status = document.getElementById('course-form-status').value;

        if (mode === 'create') {
            adminCourses.push({ id, name, sector, spaceId, schedule, teacher, status });
        } else {
            const cIdx = adminCourses.findIndex(c => c.id === id);
            if (cIdx !== -1) {
                adminCourses[cIdx] = { id, name, sector, spaceId, schedule, teacher, status };
            }
        }

        localStorage.setItem('cfp7_admin_courses', JSON.stringify(adminCourses));
        courseModal.classList.add('hidden');
        refreshAdminCoursesTable();
        refreshAdminDashboard();
    });
}

function populateCourseModalSpaces(sector) {
    const spaceFormSelect = document.getElementById('course-form-space');
    spaceFormSelect.innerHTML = '';

    const matched = Object.values(SPACES).filter(s => s.sector === sector);
    matched.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        spaceFormSelect.appendChild(opt);
    });
}

// RECARGA DEL DASHBOARD Y BITÁCORAS
function refreshAdminDashboard() {
    document.getElementById('metric-users-count').textContent = adminUsers.length;
    document.getElementById('metric-courses-count').textContent = adminCourses.filter(c => c.status === 'Activo').length;

    // Barreras activas
    const incidentsRaw = localStorage.getItem('cfp7_active_incidents') || '[]';
    let incs = [];
    try { incs = JSON.parse(incidentsRaw); } catch(e) {}
    document.getElementById('metric-barriers-count').textContent = incs.length;

    // Métricas del visitante
    const eventsRaw = localStorage.getItem('cfp7_visitor_events') || '[]';
    let events = [];
    try { events = JSON.parse(eventsRaw); } catch(e) {}
    document.getElementById('metric-events-count').textContent = events.length;

    // Cargar bitácora de eventos
    const list = document.getElementById('admin-events-list');
    list.innerHTML = '';
    
    if (events.length === 0) {
        list.innerHTML = `<p class="text-center text-muted py-4">No hay eventos de navegación registrados.</p>`;
    } else {
        events.slice(0, 10).forEach(ev => {
            const item = document.createElement('div');
            item.className = 'admin-activity-item';
            
            let detailsText = '';
            if ((ev.event === 'access_selected' || ev.event === 'Acceso seleccionado') && (ev.details.access || ev.details.acceso)) {
                detailsText = ` -> Ingreso por ${(ev.details.access || ev.details.acceso).toUpperCase()}`;
            } else if (ev.event === 'navigation_started' || ev.event === 'Inicio de navegación') {
                detailsText = ` -> De ${ev.details.origin || ev.details.origen} a ${ev.details.destination || ev.details.destino}`;
            } else if (ev.event === 'destination_selected' || ev.event === 'Destino seleccionado') {
                detailsText = ` -> Destino: ${ev.details.name || ev.details.nombre}`;
            } else if (ev.event === 'social_story_viewed' || ev.event === 'Visualización de información contextual') {
                detailsText = ` -> Historia Social: ${ev.details.name || ev.details.espacio}`;
            } else if (ev.event === 'barrier_reported' || ev.event === 'Reporte de barrera') {
                detailsText = ` -> Barrera: ${ev.details.category}`;
            } else if (ev.event === 'navigation_completed') {
                detailsText = ` -> Llegada completada (${ev.details.reached ? 'Éxito' : 'Fallo'})`;
            } else if (ev.event === 'arrival_confirmed') {
                detailsText = ` -> Confirmación de llegada`;
            }
            
            item.innerHTML = `
                <div>
                    <span class="activity-desc"><strong>${ev.userType}</strong>: ${ev.event}${detailsText}</span>
                </div>
                <span class="activity-time">${ev.timestamp.includes(', ') ? ev.timestamp.split(', ')[1] : ev.timestamp}</span>
            `;
            list.appendChild(item);
        });
    }

    // Estadísticas y gráficos por sector
    refreshAdminDashboardCharts();
}

// TABLA DE USUARIOS
function refreshAdminUsersTable() {
    const query = document.getElementById('admin-users-search').value.toLowerCase();
    const tbody = document.getElementById('admin-users-table-body');
    tbody.innerHTML = '';

    const filtered = adminUsers.filter(u => 
        u.username.toLowerCase().includes(query) || 
        u.fullName.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query)
    );

    filtered.forEach(u => {
        const tr = document.createElement('tr');
        const statusClass = u.status === 'Activo' ? 'status-active' : 'status-inactive';
        
        tr.innerHTML = `
            <td><strong>${u.username}</strong></td>
            <td>${u.fullName}</td>
            <td>${u.role}</td>
            <td><span class="status-badge ${statusClass}">${u.status}</span></td>
            <td class="table-actions">
                <button class="btn-table-action btn-edit-user" data-username="${u.username}">Editar</button>
                <button class="btn-table-action btn-toggle-user" data-username="${u.username}">
                    ${u.status === 'Activo' ? 'Desactivar' : 'Activar'}
                </button>
            </td>
        `;

        // Acciones
        tr.querySelector('.btn-edit-user').addEventListener('click', () => editUser(u));
        tr.querySelector('.btn-toggle-user').addEventListener('click', () => toggleUserStatus(u.username));

        tbody.appendChild(tr);
    });
}

function editUser(user) {
    document.getElementById('user-modal-title').textContent = 'Editar Usuario';
    document.getElementById('user-form-mode').value = 'edit';
    document.getElementById('user-form-username').value = user.username;
    document.getElementById('user-form-username').setAttribute('readonly', 'true');
    document.getElementById('user-form-fullname').value = user.fullName;
    document.getElementById('user-form-role').value = user.role;
    document.getElementById('user-form-status').value = user.status;

    document.getElementById('admin-user-modal').classList.remove('hidden');
}

function toggleUserStatus(username) {
    const idx = adminUsers.findIndex(u => u.username === username);
    if (idx !== -1) {
        adminUsers[idx].status = adminUsers[idx].status === 'Activo' ? 'Desactivado' : 'Activo';
        localStorage.setItem('cfp7_admin_users', JSON.stringify(adminUsers));
        refreshAdminUsersTable();
        refreshAdminDashboard();
    }
}

// TABLA DE CURSOS
function refreshAdminCoursesTable() {
    const query = document.getElementById('admin-courses-search').value.toLowerCase();
    const tbody = document.getElementById('admin-courses-table-body');
    tbody.innerHTML = '';

    const filtered = adminCourses.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.sector.toLowerCase().includes(query) ||
        (SPACES[c.spaceId] && SPACES[c.spaceId].name.toLowerCase().includes(query))
    );

    filtered.forEach(c => {
        const tr = document.createElement('tr');
        const statusClass = c.status === 'Activo' ? 'status-active' : 'status-inactive';
        const spaceName = SPACES[c.spaceId] ? SPACES[c.spaceId].name : c.spaceId;

        tr.innerHTML = `
            <td><strong>${c.name}</strong></td>
            <td>${c.sector}</td>
            <td>${spaceName}</td>
            <td>${c.schedule}</td>
            <td>${c.teacher || '-'}</td>
            <td><span class="status-badge ${statusClass}">${c.status}</span></td>
            <td class="table-actions">
                <button class="btn-table-action btn-edit-course" data-id="${c.id}">Editar</button>
                <button class="btn-table-action btn-table-action-delete btn-delete-course" data-id="${c.id}">Eliminar</button>
            </td>
        `;

        tr.querySelector('.btn-edit-course').addEventListener('click', () => editCourse(c));
        tr.querySelector('.btn-delete-course').addEventListener('click', () => deleteCourse(c.id));

        tbody.appendChild(tr);
    });
}

function editCourse(course) {
    document.getElementById('course-modal-title').textContent = 'Editar Curso';
    document.getElementById('course-form-mode').value = 'edit';
    document.getElementById('course-form-id').value = course.id;
    document.getElementById('course-form-name').value = course.name;
    document.getElementById('course-form-schedule').value = course.schedule;
    document.getElementById('course-form-teacher').value = course.teacher || '';
    document.getElementById('course-form-status').value = course.status;

    const sectorSelect = document.getElementById('course-form-sector');
    sectorSelect.value = course.sector;
    populateCourseModalSpaces(course.sector);
    
    document.getElementById('course-form-space').value = course.spaceId;

    document.getElementById('admin-course-modal').classList.remove('hidden');
}

function deleteCourse(id) {
    if (confirm("¿Está seguro de que desea eliminar este curso?")) {
        adminCourses = adminCourses.filter(c => c.id !== id);
        localStorage.setItem('cfp7_admin_courses', JSON.stringify(adminCourses));
        refreshAdminCoursesTable();
        refreshAdminDashboard();
    }
}

// TABLA DE BARRERAS
function refreshAdminBarriersTable() {
    const query = document.getElementById('admin-barriers-search').value.toLowerCase();
    const tbody = document.getElementById('admin-barriers-table-body');
    tbody.innerHTML = '';

    // Cargar directo de localStorage (sincronizado con reports.js)
    const incidentsRaw = localStorage.getItem('cfp7_active_incidents') || '[]';
    let incs = [];
    try { incs = JSON.parse(incidentsRaw); } catch(e) {}

    const filtered = incs.filter(i => 
        i.category.toLowerCase().includes(query) || 
        i.description.toLowerCase().includes(query) ||
        (SPACES[i.spaceId] && SPACES[i.spaceId].name.toLowerCase().includes(query))
    );

    filtered.forEach(i => {
        const tr = document.createElement('tr');
        const spaceName = SPACES[i.spaceId] ? SPACES[i.spaceId].name : i.spaceId;

        tr.innerHTML = `
            <td><span class="status-badge status-inactive">⚠️ ${i.category}</span></td>
            <td>${spaceName}</td>
            <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${i.description}</td>
            <td>${i.timestamp.split(' ')[0]}</td>
            <td><span class="status-badge status-active">Activo</span></td>
            <td class="table-actions">
                <button class="btn-table-action btn-resolve-barrier" style="color: var(--accent); border-color: rgba(16,185,129,0.2);" data-id="${i.id}">Resolver</button>
            </td>
        `;

        tr.querySelector('.btn-resolve-barrier').addEventListener('click', () => {
            // Resolver usando la lógica centralizada de reports.js
            resolveReport(i.id);
            
            // Relanzar actualización local
            setTimeout(() => {
                refreshAdminBarriersTable();
                refreshAdminDashboard();
            }, 100);
        });

        tbody.appendChild(tr);
    });
}

// --------------------------------------------------------------------------
// 7. FUNCIONES AUXILIARES DE ENRUTADO, BUSCADOR Y AUDIO (TTS)
// --------------------------------------------------------------------------

let isSpeakingActive = false;

/**
 * Llena dinámicamente los selectores de origen, destino y reportes con los espacios físicos.
 */
function populateRouteSelects() {
    const startSelect = document.getElementById('route-start');
    const endSelect = document.getElementById('route-end');
    const qrSelect = document.getElementById('qr-select-location');
    const reportLocSelect = document.getElementById('report-location');

    if (!startSelect || !endSelect) return;

    // Reiniciar selectores
    startSelect.innerHTML = '<option value="">Seleccionar punto de inicio...</option>';
    endSelect.innerHTML = '<option value="">Seleccionar destino...</option>';
    if (qrSelect) qrSelect.innerHTML = '<option value="">Elija una ubicación de escaneo simulada...</option>';
    if (reportLocSelect) reportLocSelect.innerHTML = '<option value="">Seleccione el espacio más cercano...</option>';

    // Ordenar espacios alfabéticamente
    const sortedSpaces = Object.values(SPACES).sort((a, b) => a.name.localeCompare(b.name));

    sortedSpaces.forEach(space => {
        // Opción para origen
        const optStart = document.createElement('option');
        optStart.value = space.id;
        optStart.textContent = `${space.name} (${space.floorLabel})`;
        startSelect.appendChild(optStart);

        // Opción para destino
        const optEnd = document.createElement('option');
        optEnd.value = space.id;
        optEnd.textContent = `${space.name} (${space.floorLabel})`;
        endSelect.appendChild(optEnd);

        // Opción para simulador de QR
        if (qrSelect) {
            const optQr = document.createElement('option');
            optQr.value = space.id;
            optQr.textContent = space.name;
            qrSelect.appendChild(optQr);
        }

        // Opción para ubicación de reporte
        if (reportLocSelect) {
            const optRep = document.createElement('option');
            optRep.value = space.id;
            optRep.textContent = space.name;
            reportLocSelect.appendChild(optRep);
        }
    });
}

/**
 * Lee en voz alta las indicaciones calculadas para el recorrido.
 */
function speakRouteDirections() {
    if (!activeRoute) return;

    isSpeakingActive = true;
    const btn = document.getElementById('tts-speak-route-btn');
    if (btn) {
        btn.classList.add('speaking-active');
        btn.style.background = 'var(--danger)';
        btn.setAttribute('aria-label', 'Detener lectura');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
        `;
    }

    speakRoute(activeRoute.steps, () => {
        console.log("Iniciando guiado por voz...");
    }, () => {
        handleSpeechEnd();
    });
}

/**
 * Activa o desactiva la lectura de voz de las indicaciones de ruta.
 */
function toggleSpeechReading() {
    if (isSpeakingActive) {
        stopSpeaking();
        handleSpeechEnd();
    } else {
        speakRouteDirections();
    }
}

/**
 * Restablece el estado visual del botón del lector por voz al finalizar.
 */
function handleSpeechEnd() {
    isSpeakingActive = false;
    const btn = document.getElementById('tts-speak-route-btn');
    if (btn) {
        btn.classList.remove('speaking-active');
        btn.style.background = '';
        btn.setAttribute('aria-label', 'Leer instrucciones en voz alta');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
        `;
    }
}

// --------------------------------------------------------------------------
// 8. FUNCIONES DE GOOGLE Y GRÁFICOS DEL DASHBOARD ADMINISTRATIVO
// --------------------------------------------------------------------------

function loadGoogleUserData() {
    const profileCard = document.getElementById('google-profile-card');
    if (!profileCard) return;

    if (!isGoogleUser) {
        profileCard.classList.add('hidden');
        return;
    }

    profileCard.classList.remove('hidden');

    // 1. Cargar Nombre de Usuario (Simulado)
    document.getElementById('google-user-name').textContent = "Estudiante Google CFP N°7";

    // 2. Cargar Favoritos
    const favsJson = localStorage.getItem('cfp7_google_favorites') || '[]';
    let favs = [];
    try { favs = JSON.parse(favsJson); } catch(e) {}

    const favsContainer = document.getElementById('google-favorites-container');
    if (favsContainer) {
        if (favs.length === 0) {
            favsContainer.innerHTML = `<p class="text-xs text-muted">No tienes favoritos guardados.</p>`;
        } else {
            favsContainer.innerHTML = '';
            favs.forEach(spaceId => {
                const space = SPACES[spaceId];
                if (space) {
                    const item = document.createElement('div');
                    item.className = 'google-feature-item';
                    item.style.display = 'flex';
                    item.style.justifyContent = 'space-between';
                    item.style.alignItems = 'center';
                    item.style.marginBottom = '6px';
                    item.style.padding = '4px 8px';
                    item.style.background = 'var(--bg-app)';
                    item.style.borderRadius = '4px';

                    item.innerHTML = `
                        <span style="font-size:0.8rem; font-weight:600; cursor:pointer;" class="fav-item-link">⭐ ${space.name}</span>
                        <button class="btn-remove-fav" style="background:none; border:none; color:var(--danger); cursor:pointer; font-weight:bold; font-size:0.9rem;" aria-label="Eliminar favorito">&times;</button>
                    `;

                    item.querySelector('.fav-item-link').addEventListener('click', () => {
                        document.getElementById('route-end').value = spaceId;
                        showView('view-app');
                        calculateActiveRoute();
                    });

                    item.querySelector('.btn-remove-fav').addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleFavoriteSpace(spaceId);
                    });

                    favsContainer.appendChild(item);
                }
            });
        }
    }

    // 3. Cargar Historial
    const histJson = localStorage.getItem('cfp7_google_history') || '[]';
    let hist = [];
    try { hist = JSON.parse(histJson); } catch(e) {}

    const histContainer = document.getElementById('google-history-container');
    if (histContainer) {
        if (hist.length === 0) {
            histContainer.innerHTML = `<p class="text-xs text-muted">No hay navegación previa.</p>`;
        } else {
            histContainer.innerHTML = '';
            hist.forEach(h => {
                const fromSpace = SPACES[h.from];
                const toSpace = SPACES[h.to];
                if (fromSpace && toSpace) {
                    const item = document.createElement('div');
                    item.className = 'google-feature-item';
                    item.style.display = 'flex';
                    item.style.justifyContent = 'space-between';
                    item.style.alignItems = 'center';
                    item.style.marginBottom = '6px';
                    item.style.padding = '4px 8px';
                    item.style.background = 'var(--bg-app)';
                    item.style.borderRadius = '4px';
                    item.style.cursor = 'pointer';

                    item.innerHTML = `
                        <span style="font-size:0.75rem; color:var(--text-dark); flex:1;">${fromSpace.name} &rarr; ${toSpace.name}</span>
                        <span style="font-size:0.7rem; color:var(--text-muted);">${h.date.split('/')[0]}/${h.date.split('/')[1]}</span>
                    `;

                    item.addEventListener('click', () => {
                        document.getElementById('route-start').value = h.from;
                        document.getElementById('route-end').value = h.to;
                        showView('view-app');
                        calculateActiveRoute();
                    });

                    histContainer.appendChild(item);
                }
            });
        }
    }

    // 4. Alertas de barreras activas (Receive notifications about barriers)
    const incidentsRaw = localStorage.getItem('cfp7_active_incidents') || '[]';
    let incs = [];
    try { incs = JSON.parse(incidentsRaw); } catch(e) {}
    
    const oldAlert = profileCard.querySelector('.google-barrier-alert-box');
    if (oldAlert) {
        oldAlert.remove();
    }

    const alertBox = document.createElement('div');
    alertBox.className = 'google-barrier-alert-box';
    alertBox.style.marginTop = '12px';
    alertBox.style.padding = '8px 12px';
    alertBox.style.borderRadius = '6px';
    alertBox.style.fontSize = '0.75rem';
    alertBox.style.fontWeight = '600';

    if (incs.length > 0) {
        alertBox.style.background = 'rgba(239, 68, 68, 0.1)';
        alertBox.style.borderLeft = '4px solid var(--danger)';
        alertBox.style.color = 'var(--danger)';
        alertBox.innerHTML = `⚠️ <strong>Notificación de Obstáculos:</strong> Hay ${incs.length} barreras activas reportadas hoy en el edificio. ¡Presta atención a las alertas en el mapa!`;
    } else {
        alertBox.style.background = 'rgba(16, 185, 129, 0.1)';
        alertBox.style.borderLeft = '4px solid var(--accent)';
        alertBox.style.color = 'var(--accent)';
        alertBox.innerHTML = `✅ <strong>Notificación de Obstáculos:</strong> No hay barreras reportadas hoy. El edificio se encuentra despejado.`;
    }
    
    profileCard.appendChild(alertBox);

    // 5. Cargar Preferencia de Accesibilidad
    const pref = localStorage.getItem('cfp7_google_pref') || 'standard';
    const radio = document.querySelector(`input[name="route-pref"][value="${pref}"]`);
    if (radio) {
        radio.checked = true;
    }
}

function toggleFavoriteSpace(spaceId) {
    if (!isGoogleUser) {
        alert("Inicie sesión con Google para guardar espacios en favoritos.");
        return;
    }

    const favsJson = localStorage.getItem('cfp7_google_favorites') || '[]';
    let favs = [];
    try { favs = JSON.parse(favsJson); } catch(e) {}

    const index = favs.indexOf(spaceId);
    const starBtn = document.getElementById('btn-favorite-toggle');

    if (index !== -1) {
        favs.splice(index, 1);
        if (starBtn) starBtn.classList.remove('active');
    } else {
        favs.push(spaceId);
        if (starBtn) starBtn.classList.add('active');
    }

    localStorage.setItem('cfp7_google_favorites', JSON.stringify(favs));
    loadGoogleUserData();
}

function addRouteToGoogleHistory(startId, endId) {
    if (!isGoogleUser) return;

    const histJson = localStorage.getItem('cfp7_google_history') || '[]';
    let hist = [];
    try { hist = JSON.parse(histJson); } catch(e) {}

    if (hist.length > 0 && hist[0].from === startId && hist[0].to === endId) {
        return;
    }

    const newItem = {
        id: Date.now(),
        from: startId,
        to: endId,
        date: new Date().toLocaleDateString('es-AR')
    };

    hist.unshift(newItem);
    if (hist.length > 5) {
        hist.pop();
    }

    localStorage.setItem('cfp7_google_history', JSON.stringify(hist));
    loadGoogleUserData();
}

function refreshAdminDashboardCharts() {
    const sectorStats = {
        "Sector 1: Workshops": { courses: 0, barriers: 0 },
        "Sector 2: Kitchen & Pastry": { courses: 0, barriers: 0 },
        "Sector 3: Administration & Lab": { courses: 0, barriers: 0 },
        "Sector 4: Patio & Cafeteria": { courses: 0, barriers: 0 }
    };

    // Contar cursos activos por sector
    adminCourses.forEach(c => {
        if (c.status === 'Activo' && sectorStats[c.sector]) {
            sectorStats[c.sector].courses++;
        }
    });

    // Contar barreras activas por sector
    const incidentsRaw = localStorage.getItem('cfp7_active_incidents') || '[]';
    let incs = [];
    try { incs = JSON.parse(incidentsRaw); } catch(e) {}
    incs.forEach(inc => {
        const space = SPACES[inc.spaceId];
        if (space && sectorStats[space.sector]) {
            sectorStats[space.sector].barriers++;
        }
    });

    const sectorIds = {
        "Sector 1: Workshops": "sector1",
        "Sector 2: Kitchen & Pastry": "sector2",
        "Sector 3: Administration & Lab": "sector3",
        "Sector 4: Patio & Cafeteria": "sector4"
    };

    // Encontrar el valor máximo de (cursos + barreras) para escalar los gráficos de barras
    let maxEvents = 1;
    Object.values(sectorStats).forEach(s => {
        const total = s.courses + s.barriers;
        if (total > maxEvents) {
            maxEvents = total;
        }
    });

    // Actualizar elementos DOM
    Object.entries(sectorStats).forEach(([sectorName, stats]) => {
        const idSuffix = sectorIds[sectorName];
        if (!idSuffix) return;

        const labelEl = document.getElementById(`chart-${idSuffix}-label`);
        const coursesBar = document.getElementById(`chart-${idSuffix}-courses`);
        const barriersBar = document.getElementById(`chart-${idSuffix}-barriers`);

        if (labelEl) {
            labelEl.textContent = `${stats.courses} curso${stats.courses !== 1 ? 's' : ''} | ${stats.barriers} barrera${stats.barriers !== 1 ? 's' : ''}`;
        }

        const total = stats.courses + stats.barriers;
        if (total === 0) {
            if (coursesBar) coursesBar.style.width = '0%';
            if (barriersBar) barriersBar.style.width = '0%';
        } else {
            const coursePct = (stats.courses / maxEvents) * 100;
            const barrierPct = (stats.barriers / maxEvents) * 100;

            if (coursesBar) coursesBar.style.width = `${coursePct}%`;
            if (barriersBar) barriersBar.style.width = `${barrierPct}%`;
        }
    });
}
