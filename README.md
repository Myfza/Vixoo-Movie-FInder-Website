# 🎬 Vixoo - Movie Finder Website

Vixoo is a fast, stylish, and interactive movie search web application. Built using a modern stack like Vite, TypeScript, and TailwindCSS, it's integrated with the TMDb API for movie data and Supabase for user authentication and data storage.

---

## 🔥 Featured Features

- 🔍 **Realtime Movie Search** using TMDb API
- 📝 **Complete Movie Details**: title, rating, overview, trailer, etc.
- ❤️ **Save Favorites** with Supabase Database
- 👤 **User Authentication** via Supabase Auth (Register, Login, Logout)
- 🌙 **Dark Mode Ready** using TailwindCSS
- ⚡ **Fast Performance** with Vite + Optimized Build
- 📱 **Responsive Design** (Mobile First)

---

## ⚙️ How to Install and Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/username/Vixoo-Movie-FInder-Website.git
cd Vixoo-Movie-Finder-Website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Register at [Supabase.io](https://supabase.com)
- Create a new project
- Note the **Project URL** and **Anon Key**
- Setup the database structure with a SQL file in `supabase/migrations/`
- Add a `.env` file to the project root with the following contents:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup the TMDb API

- Register an account at [TMDb](https://www.themoviedb.org/)
- Get an API Key (v3 auth)
- Add to file `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### 5. Run the project locally

```bash
npm run dev
```

Access the project at: `http://localhost:5173`

---

## 🧪 Technologies Used

| Technology | Description |
|---------------|-----------------------------------|
| Vite | Modern dev server and bundler |
| TypeScript | Main programming language |
| TailwindCSS | Utility-first CSS framework |
| Supabase | Backend: Auth + DB + Storage |
| TMDb API | Movie data source |
| PostCSS | CSS transformer |

---

## ⚠️ Important Notes

- Do not commit the `.env` file to the public repository.
- Ensure Supabase has the appropriate schema and tables.
- An internet connection is required to use TMDb and the Supabase API.

---

## 📌 Development Plan

- 🗂️ Filter by genre and year
- 📽️ Modal for YouTube trailers
- 🔄 Infinite scroll / pagination
- 📱 PWA (Progressive Web App)
- 🌐 Multilingual (i18n)
- 🧠 Movie recommendations based on user history

---

> Made with ❤️ by **Myfza**
> Powered by Supabase & TMDb API
