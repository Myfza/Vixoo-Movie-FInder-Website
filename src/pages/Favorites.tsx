import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface FavoriteMovie {
  id: string;
  movie_id: number;
  movie_title: string;
  movie_poster: string;
  movie_rating: number;
  movie_release_date: string;
  created_at: string;
}

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string, movieTitle: string) => {
    try {
      setDeletingIds(prev => new Set(prev).add(favoriteId));
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      toast.success(`${movieTitle} removed from favorites`);
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(favoriteId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-wider">
          MY <span className="text-[#8b5cf6]">FAVORITES</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 px-4">
          Your personal collection of favorite movies
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No favorites yet</h2>
          <p className="text-sm sm:text-base text-gray-400">Start exploring movies and add them to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="group bg-[#1a1a1a] rounded-lg overflow-hidden border border-transparent hover:border-[#8b5cf6]/30 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${favorite.movie_poster}`}
                  alt={favorite.movie_title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-movie.jpg';
                  }}
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id, favorite.movie_title)}
                    disabled={deletingIds.has(favorite.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                    title="Remove from favorites"
                  >
                    {deletingIds.has(favorite.id) ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 line-clamp-2">
                  {favorite.movie_title}
                </h3>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center justify-center w-4 h-4">
                      <Heart className="h-4 w-4 fill-[#ff6b35] text-[#ff6b35]" />
                    </div>
                    <span>{favorite.movie_rating?.toFixed(1)}</span>
                  </div>
                  <span>{new Date(favorite.movie_release_date).getFullYear()}</span>
                </div>

                <div className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Added {new Date(favorite.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}