const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '00637e32e173d8eea2c4bb30660e65d2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
}

class TMDBService {
  private async fetchData(endpoint: string) {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from TMDB: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getNowPlaying() {
    const data = await this.fetchData('/movie/now_playing?page=1');
    return data.results;
  }

  async getPopular(page = 1) {
    const data = await this.fetchData(`/movie/popular?page=${page}`);
    return data;
  }

  async getTopRated(page = 1) {
    const data = await this.fetchData(`/movie/top_rated?page=${page}`);
    return data.results;
  }

  async getMoviesByGenre(genreId: number, page = 1) {
    const data = await this.fetchData(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
    return data;
  }

  async getRandomRecommendations() {
    // Get random page between 1-10 for variety
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const data = await this.fetchData(`/movie/popular?page=${randomPage}`);
    
    // Shuffle and return 8 random movies
    const shuffled = data.results.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  }
  async searchMovies(query: string, page = 1) {
    const data = await this.fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    return data;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchData(`/movie/${movieId}`);
  }

  async getGenres() {
    const data = await this.fetchData('/genre/movie/list');
    return data.genres;
  }

  getImageUrl(path: string | null, size = 'w500') {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const tmdbService = new TMDBService();