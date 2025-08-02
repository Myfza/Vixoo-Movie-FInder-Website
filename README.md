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

## ⚙️ Cara Instalasi dan Menjalankan Proyek

### 1. Clone repositori

```bash
git clone https://github.com/username/Vixoo-Movie-FInder-Website.git
cd Vixoo-Movie-FInder-Website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Daftar di [Supabase.io](https://supabase.com)
- Buat project baru
- Catat **Project URL** dan **Anon Key**
- Setup struktur database dengan SQL file di `supabase/migrations/`
- Tambahkan file `.env` di root project dengan isi seperti berikut:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup TMDb API

- Daftar akun di [TMDb](https://www.themoviedb.org/)
- Dapatkan API Key (v3 auth)
- Tambahkan ke file `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### 5. Jalankan proyek secara lokal

```bash
npm run dev
```

Akses proyek di: `http://localhost:5173`

---

## 🧪 Teknologi yang Digunakan

| Teknologi     | Keterangan                        |
|---------------|-----------------------------------|
| Vite          | Dev server dan bundler modern     |
| TypeScript    | Bahasa pemrograman utama          |
| TailwindCSS   | Utility-first CSS framework       |
| Supabase      | Backend: Auth + DB + Storage      |
| TMDb API      | Sumber data film                  |
| PostCSS       | CSS transformer                   |

---

## ⚠️ Catatan Penting

- Jangan commit file `.env` ke repositori publik.
- Pastikan Supabase sudah memiliki schema & table yang sesuai.
- Koneksi internet diperlukan untuk menggunakan TMDb dan Supabase API.

---

## 📌 Rencana Pengembangan

- 🗂️ Filter berdasarkan genre dan tahun
- 📽️ Modal untuk trailer YouTube
- 🔄 Infinite scroll / pagination
- 📱 PWA (Progressive Web App)
- 🌐 Multibahasa (i18n)
- 🧠 Rekomendasi film berbasis histori pengguna

---

## 📃 Lisensi

Proyek ini dilisensikan dengan lisensi MIT. Bebas digunakan, dimodifikasi, dan dikembangkan lebih lanjut.

---

> Dibuat dengan ❤️ oleh **Myfza**  
> Powered by Supabase & TMDb API
