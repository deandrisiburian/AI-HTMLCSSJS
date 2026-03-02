// Inisialisasi settings
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadAccountInfo();
});

function loadSettings() {
    // Load semua settings dari localStorage
    const settings = {
        theme: localStorage.getItem('theme') || 'light',
        language: localStorage.getItem('language') || 'id',
        temperature: localStorage.getItem('temperature') || '0.7',
        maxTokens: localStorage.getItem('maxTokens') || '2000',
        apiKey: localStorage.getItem('apiKey') || ''
    };
    
    // Terapkan ke form
    document.getElementById('theme').value = settings.theme;
    document.getElementById('language').value = settings.language;
    document.getElementById('temperature').value = settings.temperature;
    document.getElementById('tempValue').textContent = settings.temperature;
    document.getElementById('maxTokens').value = settings.maxTokens;
    
    if (settings.apiKey) {
        document.getElementById('apiKey').value = settings.apiKey;
    }
    
    // Terapkan tema
    applyTheme(settings.theme);
}

function loadAccountInfo() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('accountUsername').textContent = currentUser;
    }
}

function saveSetting(key, value) {
    localStorage.setItem(key, value);
    
    // Handle special cases
    if (key === 'theme') {
        applyTheme(value);
    }
    
    if (key === 'temperature') {
        document.getElementById('tempValue').textContent = value;
    }
    
    // Tampilkan notifikasi
    showNotification('Pengaturan berhasil disimpan');
}

function saveAllSettings() {
    // Simpan semua settings dari form
    saveSetting('theme', document.getElementById('theme').value);
    saveSetting('language', document.getElementById('language').value);
    saveSetting('temperature', document.getElementById('temperature').value);
    saveSetting('maxTokens', document.getElementById('maxTokens').value);
    saveSetting('apiKey', document.getElementById('apiKey').value);
    
    showNotification('Semua pengaturan berhasil disimpan');
}

function resetSettings() {
    if (confirm('Reset semua pengaturan ke default?')) {
        // Hapus semua settings
        localStorage.removeItem('theme');
        localStorage.removeItem('language');
        localStorage.removeItem('temperature');
        localStorage.removeItem('maxTokens');
        localStorage.removeItem('apiKey');
        
        // Reload settings
        loadSettings();
        
        showNotification('Pengaturan direset ke default');
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
        
        // Update elemen dengan background putih
        document.querySelectorAll('.feature-card, .login-box, .settings-container, .chat-container')
            .forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.color = '#ffffff';
            });
    } else {
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.color = '#333';
        
        // Reset elemen
        document.querySelectorAll('.feature-card, .login-box, .settings-container, .chat-container')
            .forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
            });
    }
}

function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a90e2;
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Hapus setelah 3 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Tambahkan animasi
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
