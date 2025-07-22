import React from 'react';
import { Shuffle, Sparkles } from 'lucide-react';

interface RandomRecommendationsProps {
  onGetRecommendations: () => void;
  loading?: boolean;
}

export default function RandomRecommendations({ onGetRecommendations, loading }: RandomRecommendationsProps) {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#7c3aed]/20 rounded-lg p-6 sm:p-8 border border-[#8b5cf6]/30">
          <div className="flex justify-center mb-4">
            <div className="bg-[#8b5cf6]/20 p-3 rounded-full">
              <div className="flex items-center justify-center w-8 h-8">
                <Sparkles className="h-8 w-8 text-[#8b5cf6]" />
              </div>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-mono tracking-wider">
            DISCOVER SOMETHING <span className="text-[#8b5cf6]">NEW</span>
          </h2>
          
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Not sure what to watch? Let us surprise you with handpicked movie recommendations!
          </p>
          
          <button
            onClick={onGetRecommendations}
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-[#8b5cf6] hover:bg-[#8b5cf6]/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/50 touch-target"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <Shuffle className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </div>
            <span>{loading ? 'Finding Movies...' : 'Get Random Recommendations'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}