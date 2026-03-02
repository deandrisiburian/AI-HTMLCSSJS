// Mobile Menu Functions
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    
    navLinks.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle Chat Sidebar on Mobile
function toggleChatSidebar() {
    const sidebar = document.getElementById('mobileChatSidebar');
    const overlay = document.getElementById('menuOverlay');
    
    if (sidebar) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close all mobile menus
function closeAllMenus() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const mobileSidebar = document.getElementById('mobileChatSidebar');
    
    navLinks.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    if (mobileSidebar) mobileSidebar.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle resize events
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeAllMenus();
    }
});

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileSidebar = document.getElementById('mobileChatSidebar');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            closeAllMenus();
        }
    }
    
    if (mobileSidebar && mobileSidebar.classList.contains('active')) {
        if (!mobileSidebar.contains(event.target) && !event.target.closest('.icon-btn')) {
            closeAllMenus();
        }
    }
});

// Check login status and update UI
function updateUserInterface() {
    const currentUser = localStorage.getItem('currentUser');
    const userInfo = document.getElementById('userInfo');
    const mobileUserInfo = document.getElementById('mobileUserInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const mobileUsername = document.getElementById('mobileUsername');
    
    if (currentUser) {
        if (userInfo) {
            userInfo.style.display = 'flex';
            if (usernameDisplay) usernameDisplay.textContent = currentUser;
        }
        if (mobileUserInfo) {
            mobileUserInfo.style.display = 'flex';
            if (mobileUsername) mobileUsername.textContent = currentUser;
        }
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (mobileUserInfo) mobileUserInfo.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUserInterface();
    
    // Set active menu based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
