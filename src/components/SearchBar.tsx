import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="flex items-center justify-center w-5 h-5">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          disabled={loading}
          className="w-full pl-12 pr-20 sm:pr-4 py-3 sm:py-4 bg-[#1a1a1a] border border-[#8b5cf6]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
        />
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute inset-y-0 right-0 pr-2 sm:pr-4 flex items-center"
        >
          <div className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 sm:px-6 rounded-lg text-white font-medium transition-colors touch-target">
            <span className="hidden sm:inline">{loading ? 'Searching...' : 'Search'}</span>
            <div className="flex items-center justify-center w-4 h-4 sm:hidden">
              <Search className="h-4 w-4" />
            </div>
          </div>
        </button>
      </div>
    </form>
  );
}