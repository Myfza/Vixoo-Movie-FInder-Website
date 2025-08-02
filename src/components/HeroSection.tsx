import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, ChevronDown, Star, Film } from 'lucide-react';
import { tmdbService, Movie } from '../lib/tmdb';

export default function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const nowPlaying = await tmdbService.getNowPlaying();
        if (nowPlaying.length > 0) {
          // Get a random featured movie from now playing
          const randomIndex = Math.floor(Math.random() * Math.min(5, nowPlaying.length));
          setFeaturedMovie(nowPlaying[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };

    fetchFeaturedMovie();
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNowPlaying = () => {
    const nowPlayingSection = document.getElementById('now-playing');
    if (nowPlayingSection) {
      nowPlayingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-12 sm:-mt-14 pt-12 sm:pt-40">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0">
        {featuredMovie?.backdrop_path ? (
          <>
            <img
              src={tmdbService.getImageUrl(featuredMovie.backdrop_path, 'w1280')}
              alt="Featured movie backdrop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#8b5cf6]/20" />
        )}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-mono tracking-wider leading-tight">
            DISCOVER YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]">
              NEXT FAVORITE
            </span>
            <br />
            <span className="text-[#8b5cf6]">FILM</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of movies, search the latest releases, and build your personal collection of favorites. 
            Your cinematic journey starts here.
          </p>

          {/* Featured Movie Info */}
          {featuredMovie && (
            <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center space-x-4 bg-black/40 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#8b5cf6]/30">
                <Film className="h-6 w-6 text-[#8b5cf6]" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Now Featured</p>
                  <p className="text-white font-semibold">{featuredMovie.title}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-[#ff6b35] text-[#ff6b35]" />
                  <span className="text-white text-sm">{featuredMovie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Call-to-Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              to="/search"
              className="group flex items-center space-x-3 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/50 w-full sm:w-auto justify-center"
            >
              <Search className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>Start Exploring</span>
            </Link>

            {featuredMovie && (
              <Link
                to={`/movie/${featuredMovie.id}`}
                className="group flex items-center space-x-3 bg-transparent border-2 border-white/30 hover:border-[#8b5cf6] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:bg-[#8b5cf6]/10 w-full sm:w-auto justify-center"
              >
                <Play className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                <span>Watch Featured</span>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#8b5cf6] mb-1">10K+</div>
              <div className="text-sm sm:text-base text-gray-400">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#8b5cf6] mb-1">50+</div>
              <div className="text-sm sm:text-base text-gray-400">Genres</div>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#8b5cf6] mb-1">Daily</div>
              <div className="text-sm sm:text-base text-gray-400">Updates</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={scrollToNowPlaying}
            className="group flex flex-col items-center space-y-2 text-gray-400 hover:text-[#8b5cf6] transition-colors"
            aria-label="Scroll to Now Playing section"
          >
            <span className="text-sm font-medium">Explore Movies</span>
            <ChevronDown className="h-6 w-6 animate-bounce group-hover:text-[#8b5cf6]" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-ping" />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <div className="w-3 h-3 bg-[#7c3aed] rounded-full animate-pulse" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <div className="w-1 h-1 bg-[#8b5cf6] rounded-full animate-ping delay-500" />
      </div>
    </section>
  );
}