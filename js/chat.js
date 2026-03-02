let currentChat = [];
let currentModel = 'openai/gpt-3.5-turbo';

// Inisialisasi chat
document.addEventListener('DOMContentLoaded', function() {
    loadChatSettings();
    setupEventListeners();
    loadChatHistory();
});

function setupEventListeners() {
    // Enter untuk mengirim (Shift+Enter untuk new line)
    document.getElementById('userInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Ganti model
    document.getElementById('modelSelect').addEventListener('change', function(e) {
        currentModel = e.target.value;
    });
}

function loadChatSettings() {
    // Load model dari settings
    const savedModel = localStorage.getItem('selectedModel');
    if (savedModel) {
        currentModel = savedModel;
        const modelSelect = document.getElementById('modelSelect');
        if (modelSelect) {
            modelSelect.value = savedModel;
        }
    }
}

function loadChatHistory() {
    const savedChat = localStorage.getItem('currentChat');
    if (savedChat) {
        currentChat = JSON.parse(savedChat);
        displayMessages();
    }
}

function displayMessages() {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    
    messagesDiv.innerHTML = '';
    
    currentChat.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = msg.content;
        
        messageDiv.appendChild(contentDiv);
        messagesDiv.appendChild(messageDiv);
    });
    
    // Scroll ke pesan terbaru
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Cek apakah sudah login
    if (!localStorage.getItem('currentUser')) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    // Tambah pesan user ke chat
    currentChat.push({ role: 'user', content: message });
    displayMessages();
    
    // Clear input
    userInput.value = '';
    
    // Tampilkan loading
    showLoading();
    
    try {
        // Panggil API OpenRouter
        const response = await callOpenRouter(message);
        
        // Hapus loading
        removeLoading();
        
        // Tambah respon AI ke chat
        if (response && response.choices && response.choices[0]) {
            currentChat.push({ 
                role: 'assistant', 
                content: response.choices[0].message.content 
            });
            displayMessages();
            
            // Simpan chat history
            localStorage.setItem('currentChat', JSON.stringify(currentChat));
        }
    } catch (error) {
        removeLoading();
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghubungi AI. Silakan coba lagi.');
    }
}

async function callOpenRouter(message) {
    const apiKey = localStorage.getItem('apiKey') || OPENROUTER_CONFIG.API_KEY;
    const temperature = parseFloat(localStorage.getItem('temperature') || '0.7');
    const maxTokens = parseInt(localStorage.getItem('maxTokens') || '2000');
    
    // Format pesan untuk API
    const messages = currentChat.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
    }));
    
    const response = await fetch(OPENROUTER_CONFIG.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': OPENROUTER_CONFIG.SITE_URL,
            'X-Title': OPENROUTER_CONFIG.SITE_NAME
        },
        body: JSON.stringify({
            model: currentModel,
            messages: messages,
            temperature: temperature,
            max_tokens: maxTokens
        })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
}

function showLoading() {
    const messagesDiv = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message loading';
    loadingDiv.id = 'loadingMessage';
    loadingDiv.innerHTML = '<div class="message-content">AI sedang mengetik...</div>';
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeLoading() {
    const loadingDiv = document.getElementById('loadingMessage');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function newChat() {
    if (currentChat.length > 1) {
        if (confirm('Mulai chat baru? Chat saat ini akan dihapus.')) {
            currentChat = [];
            localStorage.removeItem('currentChat');
            displayMessages();
            
            // Tampilkan pesan selamat datang
            const messagesDiv = document.getElementById('chatMessages');
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'message ai-message';
            welcomeDiv.innerHTML = '<div class="message-content">Halo! Saya asisten AI EpanD. Ada yang bisa saya bantu?</div>';
            messagesDiv.appendChild(welcomeDiv);
        }
    }
}
