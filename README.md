# EpanD AI - Asisten Cerdas dengan OpenRouter API

![EpanD AI](https://img.shields.io/badge/EpanD-AI-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

EpanD AI adalah aplikasi web chat asisten cerdas yang terintegrasi dengan OpenRouter API, memungkinkan akses ke berbagai model AI terkemuka seperti NVIDIA dalam satu platform.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Demo Akun](#demo-akun)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Screenshots](#screenshots)
- [API Reference](#api-reference)
- [Pengembangan](#pengembangan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi
- Login dengan 2 akun demo
- Manajemen session dengan localStorage
- Proteksi halaman (chat & settings)

### 💬 Chat dengan AI
- **Multi-model AI**: Dukungan berbagai model melalui OpenRouter
  - Nemotron Nano 9B v2
  - Nemotron Nano 12B 2 VL
  - Nemotron 3 Nano 30B A3B
- **Real-time chat** dengan interface responsif
- **Auto-scroll** ke pesan terbaru
- **Loading indicator** saat AI merespons
- **History chat** tersimpan otomatis
- **Input auto-resize** textarea

### ⚙️ Pengaturan Lengkap
- **Tema**: Light/Dark mode
- **Bahasa**: Indonesia/English
- **Parameter AI**:
  - Temperature (kreativitas)
  - Max tokens
- **API Configuration**: OpenRouter API key
- **Reset ke default**

### 🎨 UI/UX
- Desain modern dan responsif
- Animasi halus
- Custom scrollbar
- Mobile-friendly
- Notifikasi real-time

## 👤 Demo Akun

| Username | Password | Role |
|----------|----------|------|
| user1 | password123 | User 1 |
| user2 | password456 | User 2 |

## 🛠 Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman
- **CSS3** - Styling dan animasi
- **JavaScript (Vanilla)** - Logika aplikasi
- **LocalStorage** - Penyimpanan data lokal

### API & Services
- **OpenRouter API** - Gateway ke berbagai model AI
- **Font Awesome** - Icons (opsional)

## 📁 Struktur Proyek

```
epand-ai/
│
├── 📄 index.html          # Halaman utama
├── 📄 login.html          # Halaman login
├── 📄 chat.html           # Halaman chat utama
├── 📄 settings.html       # Halaman pengaturan
│
├── 📁 css/
│   └── 📄 style.css       # Stylesheet utama
│
├── 📁 js/
│   ├── 📄 auth.js         # Autentikasi
│   ├── 📄 chat.js         # Fungsi chat & API
│   └── 📄 settings.js     # Manajemen settings
│
└── 📁 config/
    └── 📄 config.js       # Konfigurasi API
```

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/username/epand-ai.git
cd epand-ai
```

### 2. Struktur Folder
Buat struktur folder yang diperlukan:
```bash
mkdir css js config
```

### 3. Konfigurasi API
Dapatkan API key dari [OpenRouter](https://openrouter.ai/):
1. Daftar/Login ke OpenRouter
2. Buat API key baru
3. Copy API key

### 4. Setting API Key
Edit `config/config.js`:
```javascript
const OPENROUTER_CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    API_KEY: 'YOUR_API_KEY_HERE', // Ganti dengan API key Anda
    SITE_URL: window.location.origin,
    SITE_NAME: 'EpanD AI'
};
```

Atau masukkan melalui halaman Settings setelah aplikasi berjalan.

### 5. Jalankan Aplikasi
Buka `index.html` di browser modern (Chrome, Firefox, Edge, dll.)

## ⚙️ Konfigurasi

### OpenRouter Configuration
```javascript
// config/config.js
const OPENROUTER_CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    API_KEY: 'your-api-key',
    SITE_URL: 'http://localhost:5500',
    SITE_NAME: 'EpanD AI'
};
```

### Model AI Tersedia
```javascript
const AVAILABLE_MODELS = [
    { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'Nemotron Nano 9B v2' },
    { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'Nemotron Nano 12B 2 VL' },
    { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: '>Nemotron 3 Nano 30B A3B' }
];
```

## 📖 Cara Penggunaan

### 1. Login
- Buka halaman login
- Gunakan akun demo yang tersedia
- Klik pada akun untuk auto-fill

### 2. Memulai Chat
- Pilih model AI yang diinginkan
- Ketik pesan di textarea
- Tekan Enter atau klik Kirim
- Tunggu respon dari AI

### 3. Mengatur Preferences
- Buka halaman Settings
- Atur tema, bahasa, parameter AI
- Masukkan API key OpenRouter
- Simpan pengaturan

### 4. Shortcuts
- `Enter` - Kirim pesan
- `Shift + Enter` - Baris baru
- Klik akun demo - Auto-fill login

## 📸 Screenshots

### Halaman Utama
```
+----------------------+
|   EpanD AI           |
|   Home | Login | ... |
+----------------------+
|   Selamat Datang     |
|   di EpanD AI        |
|                      |
|   [Mulai Chat]       |
+----------------------+
```

### Halaman Chat
```
+--------------------------+
| Model: N.N9BV2 ▼  [New]  |
+--------------------------+
|                          |
|  AI: Halo! 👋           |
|                          |
|  User: Hai AI            |
|                          |
|  AI: Ada yang bisa       |
|      dibantu?           |
|                          |
+--------------------------+
| [Ketik pesan...] [Kirim] |
+--------------------------+
```

## 🔌 API Reference

### OpenRouter API Endpoint
```http
POST https://openrouter.ai/api/v1/chat/completions
```

### Headers
```json
{
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "HTTP-Referer": "YOUR_SITE_URL",
    "X-Title": "EpanD AI"
}
```

### Request Body
```json
{
    "model": "nvidia/nemotron-nano-9b-v2:free",
    "messages": [
        {"role": "user", "content": "Halo AI"}
    ],
    "temperature": 0.7,
    "max_tokens": 2000
}
```

### Response
```json
{
    "choices": [{
        "message": {
            "role": "assistant",
            "content": "Halo! Ada yang bisa saya bantu?"
        }
    }]
}
```

## 💻 Pengembangan

### Menambahkan Model AI Baru
Edit `config/config.js`:
```javascript
const AVAILABLE_MODELS = [
    // ... model existing
    { id: 'new-model', name: 'Nama Model' }
];
```

### Menambah Akun Baru
Edit `js/auth.js`:
```javascript
const accounts = [
    // ... akun existing
    { username: 'user3', password: 'password789', name: 'User Tiga' }
];
```

### Kustomisasi Tema
Edit `css/style.css` untuk mengubah warna, font, dll.

## 📝 To Do List

- [ ] User registration
- [ ] Chat history per user
- [ ] Unit testing

## 🐛 Known Issues

- API key tersimpan di localStorage (tidak aman untuk production)
- Tidak ada rate limiting
- History chat terbatas pada localStorage

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontak

- Website: [epand-ai.vercel.app](https://epand-ai.vercel.app

## 🙏 Acknowledgements

- [OpenRouter](https://openrouter.ai/) - API Gateway
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

---

**Made with ❤️ by EpanD AI Team**

*Catatan: Untuk production use, sebaiknya implementasikan backend server untuk menangani API key dan autentikasi dengan lebih aman.*
