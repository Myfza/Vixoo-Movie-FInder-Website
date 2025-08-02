import React, { useEffect, useState } from 'react';
import { tmdbService, Movie } from '../lib/tmdb';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import HeroSection from '../components/HeroSection';
import { Film } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const nowPlayingMovies = await tmdbService.getNowPlaying();
        const popularMoviesData = await tmdbService.getPopular(1);
        setMovies(nowPlayingMovies);
        setPopularMovies(popularMoviesData.results);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Now Playing Section */}
      <div id="now-playing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-wider">
            NOW <span className="text-[#8b5cf6]">PLAYING</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Discover the latest movies currently showing in theaters
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton count={12} />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 mb-16 sm:mb-20">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Popular Movies Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wider">
                POPULAR <span className="text-[#8b5cf6]">MOVIES</span>
              </h3>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                Most popular movies trending right now
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
              {popularMovies.map((movie) => (
                <MovieCard key={`popular-${movie.id}`} movie={movie} />
              ))}
            </div>
          </>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-sm sm:text-base text-gray-400">Try refreshing the page or check back later.</p>
          </div>
        )}
      </div>
    </>
  );
}