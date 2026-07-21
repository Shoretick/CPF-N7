/* ==========================================================================
   MÓDULO DE ACCESIBILIDAD: TEMAS, ESCALADO Y GUIADO POR VOZ
   ========================================================================== */

// Estado interno de accesibilidad
let textScaleLevel = 1; // 0: Chico, 1: Mediano, 2: Grande, 3: Muy Grande
const scaleRatios = [0.85, 1.0, 1.2, 1.45];
const scaleLabels = ["Chico", "Mediano", "Grande", "Muy Grande"];

let currentTheme = 'normal';
let isDyslexicFontActive = false;
let isVoiceAssistantActive = false;

/**
 * Inicializa los controles de la suite de accesibilidad.
 */
export function initAccessibility() {
    // 1. Abrir/Cerrar Panel de Accesibilidad (FAB)
    const fabToggle = document.getElementById('acc-panel-toggle');
    const panel = document.getElementById('accessibility-options-panel');
    const closePanelBtn = document.getElementById('close-acc-panel-btn');

    fabToggle.addEventListener('click', () => {
        const isExpanded = fabToggle.getAttribute('aria-expanded') === 'true';
        fabToggle.setAttribute('aria-expanded', !isExpanded);
        panel.classList.toggle('hidden');
    });

    closePanelBtn.addEventListener('click', () => {
        fabToggle.setAttribute('aria-expanded', 'false');
        panel.classList.add('hidden');
    });

    // Cerrar panel al pulsar Escape por accesibilidad
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panel.classList.contains('hidden')) {
            fabToggle.setAttribute('aria-expanded', 'false');
            panel.classList.add('hidden');
            fabToggle.focus();
        }
    });

    // 2. Control de Tamaño de Letra
    document.getElementById('text-size-dec').addEventListener('click', () => adjustTextSize(-1));
    document.getElementById('text-size-inc').addEventListener('click', () => adjustTextSize(1));

    // 3. Controles de Temas de Alto Contraste
    document.getElementById('contrast-normal-btn').addEventListener('click', () => applyTheme('normal'));
    document.getElementById('contrast-dark-btn').addEventListener('click', () => applyTheme('dark'));
    document.getElementById('contrast-light-btn').addEventListener('click', () => applyTheme('light'));

    // 4. Switch de Fuente Disléxica
    const dyslexicCheckbox = document.getElementById('dyslexic-font-checkbox');
    dyslexicCheckbox.addEventListener('change', (e) => {
        toggleDyslexicFont(e.target.checked);
    });

    // 5. Switch de Asistente de Voz
    const voiceCheckbox = document.getElementById('voice-assistant-checkbox');
    voiceCheckbox.addEventListener('change', (e) => {
        toggleVoiceAssistant(e.target.checked);
    });

    // Cargar configuraciones guardadas en localStorage si existen
    loadSettings();
}

/**
 * Ajusta el tamaño de la tipografía general.
 */
function adjustTextSize(direction) {
    textScaleLevel += direction;
    // Límites de tamaño seguros
    textScaleLevel = Math.max(0, Math.min(scaleRatios.length - 1, textScaleLevel));
    
    // Aplicar a la propiedad CSS raíz
    const ratio = scaleRatios[textScaleLevel];
    document.documentElement.style.setProperty('--scale-ratio', ratio);
    
    // Actualizar indicador textual
    document.getElementById('text-size-indicator').textContent = scaleLabels[textScaleLevel];

    // Anunciar cambio a lectores de pantalla
    announceAccessibilityChange(`Tamaño del texto establecido en ${scaleLabels[textScaleLevel]}`);

    saveSettings();
}

/**
 * Aplica el tema de contraste seleccionado.
 */
function applyTheme(theme) {
    if (theme !== 'normal' && theme !== 'dark' && theme !== 'light') return;
    
    currentTheme = theme;
    
    // Guardar en el atributo del documento
    if (theme === 'normal') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Actualizar estados visuales de los botones de tema
    const normalBtn = document.getElementById('contrast-normal-btn');
    const darkBtn = document.getElementById('contrast-dark-btn');
    const lightBtn = document.getElementById('contrast-light-btn');

    [normalBtn, darkBtn, lightBtn].forEach(btn => btn.classList.remove('active'));

    if (theme === 'normal') normalBtn.classList.add('active');
    if (theme === 'dark') darkBtn.classList.add('active');
    if (theme === 'light') lightBtn.classList.add('active');

    announceAccessibilityChange(`Contraste cambiado a modo ${theme === 'normal' ? 'estándar' : theme === 'dark' ? 'alto contraste oscuro' : 'alto contraste claro'}`);
    
    saveSettings();
}

/**
 * Activa/Desactiva el formato tipográfico para dislexia.
 */
function toggleDyslexicFont(active) {
    isDyslexicFontActive = active;
    
    if (isDyslexicFontActive) {
        document.body.setAttribute('data-font', 'dyslexic');
        announceAccessibilityChange("Tipografía adaptada para dislexia activada.");
    } else {
        document.body.removeAttribute('data-font');
        announceAccessibilityChange("Tipografía adaptada desactivada.");
    }

    saveSettings();
}

/**
 * Activa/Desactiva el guiado automático por voz.
 */
function toggleVoiceAssistant(active) {
    isVoiceAssistantActive = active;
    
    // Anunciar cambio por voz propia si se activa
    if (isVoiceAssistantActive) {
        announceAccessibilityChange("Guiado asistido por voz activado.");
    } else {
        announceAccessibilityChange("Guiado por voz desactivado.");
    }

    saveSettings();
}

/**
 * Retorna si el guiado por voz está activo.
 */
export function isVoiceAssistantEnabled() {
    return isVoiceAssistantActive;
}

// --------------------------------------------------------------------------
// UTILIDADES INTERNAS
// --------------------------------------------------------------------------
function announceAccessibilityChange(message) {
    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
        announcer.textContent = message;
    }
}

function saveSettings() {
    const settings = {
        textScaleLevel,
        currentTheme,
        isDyslexicFontActive,
        isVoiceAssistantActive
    };
    localStorage.setItem('cfp7_accessibility_settings', JSON.stringify(settings));
}

function loadSettings() {
    const raw = localStorage.getItem('cfp7_accessibility_settings');
    if (!raw) return;
    
    try {
        const s = JSON.parse(raw);
        
        // Cargar Tamaño
        if (typeof s.textScaleLevel === 'number') {
            textScaleLevel = s.textScaleLevel;
            const ratio = scaleRatios[textScaleLevel];
            document.documentElement.style.setProperty('--scale-ratio', ratio);
            document.getElementById('text-size-indicator').textContent = scaleLabels[textScaleLevel];
        }

        // Cargar Tema
        if (s.currentTheme) {
            applyTheme(s.currentTheme);
        }

        // Cargar Fuente
        if (typeof s.isDyslexicFontActive === 'boolean') {
            document.getElementById('dyslexic-font-checkbox').checked = s.isDyslexicFontActive;
            toggleDyslexicFont(s.isDyslexicFontActive);
        }

        // Cargar Asistente de Voz
        if (typeof s.isVoiceAssistantActive === 'boolean') {
            document.getElementById('voice-assistant-checkbox').checked = s.isVoiceAssistantActive;
            isVoiceAssistantActive = s.isVoiceAssistantActive;
        }

    } catch (e) {
        console.error("Error al cargar ajustes de accesibilidad de localStorage:", e);
    }
}
