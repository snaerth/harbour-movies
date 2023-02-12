'use client';

import { MovieSearchResult } from '../lib/slices/storeSlice';
import { useAppStore } from '../lib/store';

type MovieCardProps = MovieSearchResult[number];

export const MovieCard = ({ Poster, Title, imdbID, Year }: MovieCardProps) => {
  const { addMovie, deleteMovie } = useAppStore();

  return (
    <div className="card w-96 bg-base-100 shadow-xl w-full">
      <figure className="relative">
        <img className="w-full aspect-[2/3] max-w-full" src={Poster} alt={Title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{Title}</h2>
        <p>Year - {Year}</p>
        <p>imdbID - {imdbID}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={() => deleteMovie('snaer@aranja.com', imdbID)}>
            Remove
          </button>
          <button className="btn btn-primary" onClick={() => addMovie('snaer@aranja.com', imdbID)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
