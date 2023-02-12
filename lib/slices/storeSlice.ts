import { StateCreator } from 'zustand';
import { Movie } from '../../types/movie';

type AddMovie = {
  imdbId: string;
  listId: number;
};

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

const addMovie = async (params: AddMovie) => {
  const response = await fetch('api/movie', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ ...params }),
  });
  return response.json();
};

const deleteMovie = async (id: number) => {
  const response = await fetch('api/movie', {
    method: 'DELETE',
    headers: defaultHeaders,
    body: JSON.stringify({ id }),
  });
  return response.json();
};

export interface StoreSlice {
  search: string;
  setSearch: (search: string) => void;
  searchResults: MovieSearchResult;
  addMovie: (params: AddMovie) => void;
  deleteMovie: (id: number) => void;
}

export const createStoreSlice: StateCreator<StoreSlice> = (set) => ({
  search: '',
  setSearch: async (search: string) => {
    set({ search, searchResults: await fetchMovies(search) });
  },
  searchResults: [],
  addMovie: async (params: AddMovie) => {
    await addMovie(params);
  },
  deleteMovie: async (id: number) => {
    await deleteMovie(id);
  },
});
