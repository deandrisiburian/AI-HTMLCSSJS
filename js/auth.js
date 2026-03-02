// Data akun (simulasi database)
const accounts = [
    { username: 'user1', password: 'password123', name: 'User Satu' },
    { username: 'user2', password: 'password456', name: 'User Dua' }
];

// Cek status login
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Jika halaman login dan sudah login, redirect ke chat
    if (currentPage === 'login.html' && currentUser) {
        window.location.href = 'chat.html';
        return;
    }
    
    // Jika halaman chat/settings dan belum login, redirect ke login
    if ((currentPage === 'chat.html' || currentPage === 'settings.html') && !currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Tampilkan username jika sudah login
    if (currentUser) {
        const usernameSpan = document.getElementById('username');
        if (usernameSpan) {
            const user = accounts.find(acc => acc.username === currentUser);
            usernameSpan.textContent = user ? user.name : currentUser;
        }
    }
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    
    if (account) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'chat.html';
    } else {
        errorElement.textContent = 'Username atau password salah!';
    }
});

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Isi form login dengan akun demo
function fillCredentials(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
}

// Inisialisasi auth saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkAuth);
