import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Film } from 'lucide-react';

export interface Category {
  id: number;
  name: string;
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
  loading?: boolean;
}

export default function CategoryMenu({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  loading 
}: CategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category: Category | null) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center space-x-2 px-4 py-3 bg-[#1a1a1a] border border-[#8b5cf6]/30 rounded-lg text-white hover:border-[#8b5cf6] focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] touch-target"
      >
        <div className="flex items-center justify-center w-5 h-5">
          <Film className="h-5 w-5 text-[#8b5cf6]" />
        </div>
        <span className="flex-1 text-left">
          {selectedCategory ? selectedCategory.name : 'All Categories'}
        </span>
        <div className="flex items-center justify-center w-5 h-5">
          <ChevronDown 
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#8b5cf6]/30 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full px-4 py-3 text-left hover:bg-[#8b5cf6]/20 transition-colors touch-target ${
                !selectedCategory ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'text-white'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`w-full px-4 py-3 text-left hover:bg-[#8b5cf6]/20 transition-colors touch-target ${
                  selectedCategory?.id === category.id 
                    ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' 
                    : 'text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}