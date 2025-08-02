import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService, Movie } from '../lib/tmdb';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CategoryMenu, { Category } from '../components/CategoryMenu';
import RandomRecommendations from '../components/RandomRecommendations';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState<'search' | 'category' | 'recommendations'>('search');

  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await tmdbService.getGenres();
        setCategories(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (categoryId) {
      const category = categories.find(c => c.id === parseInt(categoryId));
      if (category) {
        setSelectedCategory(category);
        setViewMode('category');
        fetchMoviesByCategory(category.id, 1);
      }
    }
  }, [categoryId, categories]);
  const handleSearch = (searchQuery: string) => {
    setSearchParams({ q: searchQuery });
    setSelectedCategory(null);
    setViewMode('search');
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category: category.id.toString() });
      setViewMode('category');
      fetchMoviesByCategory(category.id, 1);
    } else {
      setSearchParams({});
      setViewMode('search');
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
    }
    setCurrentPage(1);
  };

  const handleGetRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      setViewMode('recommendations');
      setSearchParams({});
      setSelectedCategory(null);
      
      const recommendations = await tmdbService.getRandomRecommendations();
      setMovies(recommendations);
      setTotalResults(recommendations.length);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error getting recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesByCategory = async (genreId: number, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tmdbService.getMoviesByGenre(genreId, page);
      
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error fetching movies by category:', err);
    } finally {
      setLoading(false);
    }
  };
  const searchMovies = async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await tmdbService.searchMovies(searchQuery, page);
      
      // If it's the first page, replace movies; otherwise, append them
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && viewMode === 'search') {
      searchMovies(query, currentPage);
    }
  }, [query, currentPage, viewMode]);

  const handlePageChange = (page: number) => {
    if (viewMode === 'search' && query) {
      setCurrentPage(page);
    } else if (viewMode === 'category' && selectedCategory) {
      fetchMoviesByCategory(selectedCategory.id, page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = () => {
    if (viewMode === 'recommendations') {
      return 'Random Recommendations';
    } else if (viewMode === 'category' && selectedCategory) {
      return `${selectedCategory.name} Movies`;
    } else if (query) {
      return `Search results for "${query}"`;
    }
    return 'Movie Search';
  };

  const getPageDescription = () => {
    if (viewMode === 'recommendations') {
      return `Discover ${movies.length} handpicked movie recommendations just for you`;
    } else if (viewMode === 'category' && selectedCategory) {
      return `${totalResults} ${selectedCategory.name.toLowerCase()} movies • Page ${currentPage} of ${totalPages}`;
    } else if (query && totalResults > 0) {
      return `Found ${totalResults} results • Page ${currentPage} of ${totalPages}`;
    }
    return '';
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 font-mono tracking-wider">
          MOVIE <span className="text-[#8b5cf6]">SEARCH</span>
        </h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <CategoryMenu
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            loading={loading}
          />
        </div>
      </div>

      {/* Random Recommendations Section */}
      {!query && !selectedCategory && viewMode === 'search' && (
        <RandomRecommendations 
          onGetRecommendations={handleGetRecommendations}
          loading={loading}
        />
      )}

      {(query || selectedCategory || viewMode === 'recommendations') && (
        <div className="mb-6 sm:mb-8 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
            {getPageTitle()}
          </h2>
          {getPageDescription() && (
            <p className="text-sm sm:text-base text-gray-400">
              {getPageDescription()}
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="text-center py-8 sm:py-12 px-4">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Search Error</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => {
              if (viewMode === 'search' && query) {
                searchMovies(query, currentPage);
              } else if (viewMode === 'category' && selectedCategory) {
                fetchMoviesByCategory(selectedCategory.id, currentPage);
              } else if (viewMode === 'recommendations') {
                handleGetRecommendations();
              }
            }}
            className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white px-6 py-2 rounded-lg font-medium transition-colors touch-target"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton count={12} />
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && viewMode !== 'recommendations' && (
            <div className="flex justify-center items-center space-x-2 mt-8 sm:mt-12 px-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 bg-[#1a1a1a] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8b5cf6]/20 transition-colors touch-target text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-2 sm:px-3 py-2 rounded-lg transition-colors touch-target text-sm sm:text-base ${
                        pageNum === currentPage
                          ? 'bg-[#8b5cf6] text-white'
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#8b5cf6]/20'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 bg-[#1a1a1a] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8b5cf6]/20 transition-colors touch-target text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </button>
              
              {/* Load More Button for Mobile */}
              {currentPage < totalPages && (
                <div className="sm:hidden w-full mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-full bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 text-white py-3 px-4 rounded-lg font-medium transition-colors touch-target"
                  >
                    Load More Movies ({totalResults - movies.length} remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (query || selectedCategory || viewMode === 'recommendations') && !loading ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No movies found</h2>
          <p className="text-sm sm:text-base text-gray-400">
            {viewMode === 'search' 
              ? 'Try searching with different keywords.' 
              : viewMode === 'category' 
              ? 'No movies found in this category.' 
              : 'Unable to get recommendations right now.'}
          </p>
        </div>
      ) : !query && !selectedCategory && viewMode === 'search' ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Start your movie search</h2>
          <p className="text-sm sm:text-base text-gray-400">
            Enter a movie title, select a category, or get random recommendations.
          </p>
        </div>
      ) : null}
    </div>
  );
}