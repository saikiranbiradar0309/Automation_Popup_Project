// ==========================================
// TOAST NOTIFICATION UTILITY
// ==========================================

function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
        success: '✅',
        error:   '❌',
        warning: '⚠️',
        info:    'ℹ️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-out 0.35s ease forwards';
        setTimeout(() => toast.remove(), 350);
    }, duration);
}
