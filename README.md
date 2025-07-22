# 🎬 Vixoo - Movie Finder Website

**Vixoo** adalah aplikasi web pencarian film yang cepat, stylish, dan interaktif. Dibangun menggunakan stack modern seperti **Vite**, **TypeScript**, dan **TailwindCSS**, serta terintegrasi dengan **TMDb API** untuk data film dan **Supabase** untuk autentikasi serta penyimpanan data pengguna.

---

## 🔥 Fitur Unggulan

- 🔍 **Pencarian Film Realtime** menggunakan TMDb API
- 📝 **Detail Film Lengkap**: judul, rating, overview, trailer, dsb
- ❤️ **Simpan Favorit** dengan Supabase Database
- 👤 **Autentikasi User** via Supabase Auth (Register, Login, Logout)
- 🌙 **Dark Mode Ready** menggunakan TailwindCSS
- ⚡ **Performa Cepat** dengan Vite + Optimized Build
- 📱 **Desain Responsif** (Mobile First)

---

### ⚙️ Cara Instalasi dan Menjalankan Proyek
1. Clone repositori
bash
Salin
Edit
git clone https://github.com/username/Vixoo-Movie-FInder-Website.git
cd Vixoo-Movie-FInder-Website
2. Install dependencies
bash
Salin
Edit
npm install
3. Setup Supabase
Daftar di Supabase.io

Buat project baru

Catat project URL dan anon key

Setup struktur database via SQL migration (supabase/migrations/)

Tambahkan file .env di root:

env
Salin
Edit
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Setup TMDb API
Daftar akun di TMDb

Dapatkan API Key (v3 auth)

Tambahkan ke .env:

env
Salin
Edit
VITE_TMDB_API_KEY=your_tmdb_api_key
5. Jalankan proyek lokal
bash
Salin
Edit
npm run dev
Proyek akan berjalan di http://localhost:5173

🧪 Teknologi yang Digunakan
Teknologi	Keterangan
Vite	Dev server dan bundler modern
TypeScript	Bahasa pemrograman utama
TailwindCSS	Utility-first CSS framework
Supabase	Backend: Auth + DB + Storage
TMDb API	Sumber data film
PostCSS	CSS transformer

⚠️ Catatan Penting
Jangan commit .env ke repositori publik.

Pastikan Supabase sudah memiliki table dan schema sesuai kebutuhan.

Koneksi internet dibutuhkan untuk akses data TMDb dan Supabase.

