/* ==========================================================================
   MÓDULO QR: SIMULADOR DE ESCANEO DE CÓDIGOS DE UBICACIÓN
   ========================================================================== */

import { QR_LOCATIONS, SPACES } from './data.js';
import { selectSpace } from './map.js';

// Callback registrado para notificar cuando se simula un escaneo
let onQRScannedCallback = null;

/**
 * Inicializa el simulador de códigos QR.
 * @param {Function} onQRScanned - Callback que recibe el ID del espacio escaneado
 */
export function initQR(onQRScanned) {
    onQRScannedCallback = onQRScanned;

    const qrBtn = document.getElementById('qr-simulate-btn');
    const modal = document.getElementById('qr-modal');
    const closeBtn = document.getElementById('close-qr-modal-btn');
    const backdrop = modal.querySelector('.modal-backdrop');
    const actionBtn = document.getElementById('simulate-scan-action-btn');
    const select = document.getElementById('qr-select-location');

    // 1. Llenar el desplegable con las ubicaciones de QR de pared
    populateQRSelect(select);

    // 2. Controlar visibilidad del modal
    qrBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        select.focus();
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        qrBtn.focus();
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Cerrar con Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // 3. Simular Acción de Escaneo
    actionBtn.addEventListener('click', () => {
        const selectedSpaceId = select.value;
        if (!selectedSpaceId) {
            alert("Por favor, elija un código QR físico para simular.");
            return;
        }

        // Ejecutar el callback con el ID del espacio
        if (onQRScannedCallback) {
            onQRScannedCallback(selectedSpaceId);
        }

        // Seleccionar espacialmente en el mapa
        selectSpace(selectedSpaceId);

        // Anunciar de forma auditiva / texto accesible
        const spaceName = SPACES[selectedSpaceId].name;
        const announcer = document.getElementById('aria-announcer');
        if (announcer) {
            announcer.textContent = `Escaneo QR exitoso. Su ubicación se ha fijado en: ${spaceName}.`;
        }

        // Mostrar notificación o feedback visual
        showQRToast(spaceName);

        // Cerrar modal
        closeModal();
    });
}

/**
 * Llena el desplegable del modal.
 */
function populateQRSelect(selectElement) {
    if (!selectElement) return;
    
    // Limpiar opciones previas manteniendo la primera
    selectElement.innerHTML = `<option value="">Elija una ubicación de escaneo simulada...</option>`;
    
    QR_LOCATIONS.forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc.id;
        opt.textContent = loc.name;
        selectElement.appendChild(opt);
    });
}

/**
 * Muestra un banner flotante temporal de confirmación.
 */
function showQRToast(spaceName) {
    // Crear elemento toast si no existe
    let toast = document.getElementById('qr-toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'qr-toast-notification';
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'var(--accent)';
        toast.style.color = '#ffffff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '30px';
        toast.style.boxShadow = 'var(--shadow-lg)';
        toast.style.zIndex = '9999';
        toast.style.fontWeight = '700';
        toast.style.fontSize = '0.9rem';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '8px';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Escaneado: Ubicado en ${spaceName}</span>
    `;

    // Animación de entrada
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.top = '30px';
    }, 50);

    // Animación de salida
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.top = '20px';
    }, 3500);
}
