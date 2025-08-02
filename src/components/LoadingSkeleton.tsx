import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

export default function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden animate-pulse">
          <div className="h-80 bg-gray-700" />
          <div className="p-4">
            <div className="h-6 bg-gray-700 rounded mb-2" />
            <div className="flex justify-between">
              <div className="h-4 bg-gray-700 rounded w-16" />
              <div className="h-4 bg-gray-700 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}