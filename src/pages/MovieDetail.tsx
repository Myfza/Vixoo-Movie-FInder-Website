import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService, MovieDetails } from '../lib/tmdb';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Star, Calendar, Clock, Heart, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieDetails = await tmdbService.getMovieDetails(parseInt(id));
        setMovie(movieDetails);
        
        // Check if movie is in favorites
        if (user) {
          const { data } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('movie_id', parseInt(id))
            .single();
          
          setIsFavorite(!!data);
        }
      } catch (err) {
        setError('Failed to load movie details.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, user]);

  const handleFavoriteToggle = async () => {
    if (!user || !movie) {
      toast.error('Please sign in to add favorites');
      navigate('/login');
      return;
    }

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('movie_id', movie.id);

        if (error) throw error;
        
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            movie_id: movie.id,
            movie_title: movie.title,
            movie_poster: movie.poster_path,
            movie_rating: movie.vote_average,
            movie_release_date: movie.release_date,
          });

        if (error) throw error;
        
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6]"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie Not Found</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbService.getImageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 sm:mb-8 transition-colors touch-target"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Poster */}
            <div className="lg:col-span-1">
              <img
                src={tmdbService.getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 rounded-lg shadow-xl"
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-wide">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg sm:text-xl text-[#8b5cf6] italic mb-4 sm:mb-6">"{movie.tagline}"</p>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-5 h-5">
                    <Star className="h-5 w-5 fill-[#ff6b35] text-[#ff6b35]" />
                  </div>
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-5 h-5">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-2 sm:px-3 py-1 bg-[#1a1a1a] text-[#8b5cf6] rounded-full text-xs sm:text-sm font-medium border border-[#8b5cf6]/30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Overview</h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                className={`flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg font-medium transition-all touch-target ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                />
                <span>
                  {favoriteLoading
                    ? 'Loading...'
                    : isFavorite
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}