import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '../lib/tmdb';
import { tmdbService } from '../lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8b5cf6]/20 border border-transparent hover:border-[#8b5cf6]/30 touch-target"
    >
      <div className="relative overflow-hidden">
        <img
          src={tmdbService.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-white text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-[#8b5cf6] transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="flex items-center justify-center w-4 h-4">
              <Star className="h-4 w-4 fill-[#ff6b35] text-[#ff6b35]" />
            </div>
            <span>{movie.vote_average?.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center justify-center w-4 h-4">
              <Calendar className="h-4 w-4" />
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}