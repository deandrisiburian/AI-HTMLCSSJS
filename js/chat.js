let currentChat = [];
let currentModel = 'nvidia/nemotron-nano-9b-v2:free';
let isLoading = false;

// Inisialisasi chat
document.addEventListener('DOMContentLoaded', function() {
    loadChatSettings();
    setupEventListeners();
    loadChatHistory();
    updateMessageCount();
    focusInput();
});

function setupEventListeners() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    if (userInput) {
        // Enter untuk mengirim (Shift+Enter untuk new line)
        userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && this.value.trim()) {
                    sendMessage();
                }
            }
        });
        
        // Auto-resize textarea
        userInput.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
    }
    
    // Ganti model
    const modelSelect = document.getElementById('modelSelect');
    if (modelSelect) {
        modelSelect.addEventListener('change', function(e) {
            currentModel = e.target.value;
            localStorage.setItem('selectedModel', currentModel);
            updateActiveModel();
        });
    }
    
    // Cegah submit form
    const forms = document.getElementsByTagName('form');
    for (let form of forms) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    
    // Jika mencapai max height, aktifkan scroll
    if (textarea.scrollHeight > 150) {
        textarea.style.overflowY = 'auto';
    } else {
        textarea.style.overflowY = 'hidden';
    }
}

function focusInput() {
    const userInput = document.getElementById('userInput');
    if (userInput) {
        setTimeout(() => userInput.focus(), 100);
    }
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
    updateActiveModel();
}

function updateActiveModel() {
    const activeModelSpan = document.getElementById('activeModel');
    if (activeModelSpan) {
        const modelSelect = document.getElementById('modelSelect');
        if (modelSelect) {
            const selectedOption = modelSelect.options[modelSelect.selectedIndex];
            activeModelSpan.textContent = selectedOption ? selectedOption.text : currentModel;
        }
    }
}

function loadChatHistory() {
    const savedChat = localStorage.getItem('currentChat');
    if (savedChat) {
        try {
            currentChat = JSON.parse(savedChat);
            displayMessages();
        } catch (e) {
            console.error('Error loading chat history:', e);
            currentChat = [];
        }
    }
}

function displayMessages() {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    
    // Simpan scroll position
    const wasAtBottom = isScrolledToBottom(messagesDiv);
    
    messagesDiv.innerHTML = '';
    
    if (currentChat.length === 0) {
        // Tampilkan pesan selamat datang jika tidak ada chat
        const welcomeDiv = createMessageElement('assistant', 'Halo! Saya asisten AI EpanD. Ada yang bisa saya bantu?');
        messagesDiv.appendChild(welcomeDiv);
    } else {
        // Tampilkan semua pesan
        currentChat.forEach(msg => {
            const messageDiv = createMessageElement(msg.role, msg.content);
            messagesDiv.appendChild(messageDiv);
        });
    }
    
    // Update message count
    updateMessageCount();
    
    // Scroll ke bawah jika sebelumnya di bawah
    if (wasAtBottom || currentChat.length > 0) {
        scrollToBottom();
    }
}

function createMessageElement(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Format pesan (handle markdown sederhana)
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    return messageDiv;
}

function isScrolledToBottom(element) {
    if (!element) return true;
    const threshold = 100; // pixel threshold
    return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
}

function scrollToBottom() {
    const messagesDiv = document.getElementById('chatMessages');
    if (messagesDiv) {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function updateMessageCount() {
    const countSpan = document.getElementById('messageCount');
    if (countSpan) {
        // Hitung hanya pesan user dan AI (tanpa pesan selamat datang default)
        const messageCount = currentChat.filter(msg => 
            msg.role === 'user' || msg.role === 'assistant'
        ).length;
        countSpan.textContent = messageCount || 1;
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const message = userInput.value.trim();
    
    if (!message || isLoading) return;
    
    // Cek apakah sudah login
    if (!localStorage.getItem('currentUser')) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    // Disable input dan button selama loading
    isLoading = true;
    userInput.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Mengirim...';
    
    // Tambah pesan user ke chat
    currentChat.push({ role: 'user', content: message });
    displayMessages();
    
    // Clear input dan reset height
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Tampilkan loading
    showLoading();
    
    try {
        // Panggil API OpenRouter
        const response = await callOpenRouter(message);
        
        // Hapus loading
        removeLoading();
        
        // Tambah respon AI ke chat
        if (response && response.choices && response.choices[0]) {
            const aiResponse = response.choices[0].message.content;
            currentChat.push({ 
                role: 'assistant', 
                content: aiResponse 
            });
            
            displayMessages();
            
            // Simpan chat history
            localStorage.setItem('currentChat', JSON.stringify(currentChat));
        }
    } catch (error) {
        removeLoading();
        console.error('Error:', error);
        
        // Tampilkan pesan error
        currentChat.push({ 
            role: 'assistant', 
            content: 'Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.' 
        });
        displayMessages();
    } finally {
        // Enable input dan button
        isLoading = false;
        userInput.disabled = false;
        sendButton.disabled = false;
        sendButton.textContent = 'Kirim';
        
        // Focus kembali ke input
        userInput.focus();
    }
}

async function callOpenRouter(message) {
    const apiKey = localStorage.getItem('apiKey') || OPENROUTER_CONFIG.API_KEY;
    const temperature = parseFloat(localStorage.getItem('temperature') || '0.7');
    const maxTokens = parseInt(localStorage.getItem('maxTokens') || '2000');
    
    // Format pesan untuk API (ambil 10 pesan terakhir untuk konteks)
    const recentMessages = currentChat.slice(-10).map(msg => ({
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
            messages: recentMessages,
            temperature: temperature,
            max_tokens: maxTokens
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }
    
    return await response.json();
}

function showLoading() {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message loading';
    loadingDiv.id = 'loadingMessage';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = 'AI sedang mengetik';
    
    loadingDiv.appendChild(contentDiv);
    messagesDiv.appendChild(loadingDiv);
    
    scrollToBottom();
}

function removeLoading() {
    const loadingDiv = document.getElementById('loadingMessage');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function newChat() {
    if (currentChat.length > 0) {
        if (confirm('Mulai chat baru? Chat saat ini akan dihapus.')) {
            currentChat = [];
            localStorage.removeItem('currentChat');
            displayMessages();
            focusInput();
        }
    }
}

function clearChat() {
    if (currentChat.length > 0) {
        if (confirm('Hapus semua pesan?')) {
            currentChat = [];
            localStorage.removeItem('currentChat');
            displayMessages();
            focusInput();
        }
    }
}

// Fungsi untuk logout (override dari auth.js)
function logout() {
    if (confirm('Yakin ingin logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Simpan chat sebelum meninggalkan halaman
window.addEventListener('beforeunload', function() {
    if (currentChat.length > 0) {
        localStorage.setItem('currentChat', JSON.stringify(currentChat));
    }
});
