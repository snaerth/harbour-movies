import { supabase } from '../lib/supabase';
import { OMDB_API_KEY } from '../utils/constants';
import { Movie } from '../types/movie';

export const getMovieById = async (id: string): Promise<Movie> => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&plot=full`;

  try {
    const response = await fetch(`${baseUrl}&i=${id}`);
    return (await response.json()) as Movie;
  } catch (e) {
    throw e;
  }
};

export const searchMovies = async (title: string, year?: string) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  try {
    const response = await fetch(`${baseUrl}&s=${title}${year ? `&y=${year}` : ''}`);
    return await response.json();
  } catch (e) {
    throw e;
  }
};

export type AddMovieParams = {
  imdbId: string;
  movie: Movie;
  listId: number;
};

export const addMovie = async ({ imdbId, movie, listId }: AddMovieParams) => {
  const res = await supabase.from('my_movies').select('imdb_id').eq('movie_list_id', listId);
  const list = res.data as { imdb_id: string }[];
  const exists = list?.find((item) => item.imdb_id === imdbId);

  if (exists) {
    throw new Error('Item is already in your list');
  }

  const { data, error } = await supabase
    .from('my_movies')
    .insert({
      imdb_id: imdbId,
      movie: JSON.stringify(movie),
      movie_list_id: listId,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return {
    ...data[0],
    movie: JSON.parse(data[0].movie),
  };
};

export const removeMovie = async (id: number, listId: number) => {
  const { error } = await supabase.from('my_movies').delete().match({ id, movie_list_id: listId });

  if (error) {
    throw error;
  }

  return true;
};

export const createList = async (name: string, email: string) => {
  const res = await supabase.from('movie_lists').select('name,email').match({ name, email });

  if (res.data.length > 0 || res.error) {
    throw new Error('List already exists');
  }

  const { data, error } = await supabase.from('movie_lists').insert({ name, email }).select('*');

  if (error) {
    throw error;
  }

  return data[0];
};

export const getMovieLists = async (email: string) => {
  const { data, error } = await supabase.from('movie_lists').select('*').eq('email', email);

  if (error) {
    throw error;
  }

  return data;
};

export const getMovieList = async (id: string) => {
  const { data, error } = await supabase.from('movie_lists').select('*').eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteMovieList = async (id: string) => {
  const { error: myMoviesError } = await supabase.from('my_movies').delete().eq('movie_list_id', id);

  if (myMoviesError) {
    throw myMoviesError;
  }

  const { error } = await supabase.from('movie_lists').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return true;
};

type MovieListItem = {
  id: number;
  created_at: string;
  imdb_id: string;
  movie_list_id: number;
  movie: Movie;
};

export const getMovieListItems = async (listId: number) => {
  const { data, error } = await supabase.from('my_movies').select('*').eq('movie_list_id', listId);

  if (error) {
    throw error;
  }

  return (data as MovieListItem[]).map((item) => ({
    ...item,
    movie: JSON.parse(item.movie as unknown as string) as Movie,
  }));
};
