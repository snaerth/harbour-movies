import { StateCreator } from 'zustand';
import { Movie } from '../../types/movie';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export type MovieSearchResult =
  | {
      Poster: string;
      Title: string;
      Type: string;
      Year: string;
      imdbID: string;
    }[]
  | Movie[];

const fetchMovies = async (search: string) => {
  const response = await fetch(`api/movie?search=${search}`, {
    headers: defaultHeaders,
  });
  return (await response.json()) as MovieSearchResult;
};

const addMovie = async (email: string, id: string) => {
  const response = await fetch('api/movie', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email, id }),
  });
  return response.json();
};

const deleteMovie = async (email: string, id: string) => {
  const response = await fetch('api/movie', {
    method: 'DELETE',
    headers: defaultHeaders,
    body: JSON.stringify({ email, id }),
  });
  return response.json();
};

export interface StoreSlice {
  search: string;
  setSearch: (search: string) => void;
  searchResults: MovieSearchResult;
  addMovie: (email: string, id: string) => void;
  deleteMovie: (email: string, id: string) => void;
}

export const createStoreSlice: StateCreator<StoreSlice> = (set) => ({
  search: '',
  setSearch: async (search: string) => {
    set({ search, searchResults: await fetchMovies(search) });
  },
  searchResults: [],
  addMovie: async (email: string, id: string) => {
    await addMovie(email, id);
  },
  deleteMovie: async (email: string, id: string) => {
    await deleteMovie(email, id);
  },
});
