# 🚀 Dapur Buzzer & Sprintpedia API Simulation
**Submission Test 1 & 2 – Full Stack Developer**  
by **Deden Setiawan**

---

## 📎 Repository & Demo

| Item | Link |
|------|------|
| 🧩 GitHub Repository | [https://github.com/kimcil92/dapurbuzzer-test](https://github.com/kimcil92/dapurbuzzer-test) |
| 🌐 Live Demo | [https://dapurbuzzer-test.vercel.app/](https://dapurbuzzer-test.vercel.app/) |

---

## 🧠 Project Overview

### 🟣 Test 1 – UI/UX Redesign + CRUD (Dapur Buzzer)
- Re-design website **[Dapur Buzzer Indonesia](https://app.dapurbuzzer.co.id)** dengan gaya modern, clean, dan responsive.
- Implemented **Home Page redesign** menggunakan **Next.js + TailwindCSS + Flowbite**.
- Built **CRUD Banner Management** terhubung langsung ke **Laravel API**.
- Backend menggunakan **Laravel + MySQL**, dengan fitur:
    - CRUD API untuk banner.
    - Seeder otomatis (banner 1–5).
    - Upload file atau input URL gambar banner.
- Full responsive (desktop + mobile view).
- Integrasi penuh antara frontend dan backend melalui REST API (Axios).

### 🟣 Test 2 – REST API Simulation (Sprintpedia)
- Melakukan *endpoint discovery* terhadap **Sprintpedia Instagram Tools API** di:  
  [https://sprintpedia.id/page/instagram_tools](https://sprintpedia.id/page/instagram_tools)
- Simulasi **HTTP POST Request** ke endpoint yang ditemukan menggunakan Axios.
- Menampilkan hasil response di frontend dengan tampilan clean dan informatif.
- Dilengkapi validasi, error handling, dan feedback real-time.

---

## 🧰 Tech Stack

| Layer | Technology                                      |
|-------|-------------------------------------------------|
| **Frontend** | Next.js 14, TailwindCSS, Flowbite, Axios        |
| **Backend** | Laravel 11, MySQL                               |
| **API Simulation** | Axios / Fetch API                               |
| **Deployment** | Vercel (Frontend), Localhost / Render (Backend) |

---

## ⚙️ Folder Structure

dapurbuzzer-test/
├── backend/ → Laravel API (CRUD Banner)
├── frontend/ → Next.js Frontend (UI/UX + API Integration)
└── README.md → Dokumentasi project


---

## 💡 Setup & Installation

### 🟢 Frontend (Next.js)
```bash
# 1️⃣ Masuk ke folder frontend
cd frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Buat file environment
cp .env.local.example .env.local

# 4️⃣ Jalankan development server
npm run dev

# 5️⃣ Build untuk production
npm run build && npm run start
```

### 🟢 Backend (Laravel)
```
# 1️⃣ Masuk ke folder backend
cd backend

# 2️⃣ Install dependencies
composer install

# 3️⃣ Copy file environment
cp .env.example .env

# 4️⃣ Generate key
php artisan key:generate

# 5️⃣ Buat symbolic link ke storage
php artisan storage:link

# 6️⃣ Jalankan migration & seeder
php artisan migrate:fresh --seed

# 7️⃣ Jalankan server
php artisan serve
```

| Halaman                       |
| ----------------------------- |
| 🏠 Home Page                  |
| 🧩 Banner Dashboard           |
| ⚙️ API Sprintpedia Simulation |


✨ Author

👨‍💻 Deden Setiawan
Full Stack Developer – Laravel & Next.js
📧 Email: dedenjapan@gmail.com

🌐 https://github.com/kimcil92