'use client';

import { useAppStore } from '../lib/store';
import { MovieCard } from './MovieCard';

export const SearchResults = () => {
  const { searchResults } = useAppStore();

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-8">
        {searchResults?.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
};
