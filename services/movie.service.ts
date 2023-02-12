import { supabase } from '../lib/supabase';
import { OMDB_API_KEY } from '../utils/constants';
import { Movie } from '../types/movie';

export const getMyMovies = async (email: string): Promise<Movie[]> => {
  try {
    const { data: list, error } = await supabase.from('my_movies').select('movie').eq('email', email);

    if (error) {
      return [];
    }

    return list.filter((item) => item.movie).map((obj) => JSON.parse(obj.movie)) as Movie[];
  } catch (e) {
    throw new Error('Could not get movie list');
  }
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&plot=full`;

  try {
    const response = await fetch(`${baseUrl}&i=${id}`);
    return (await response.json()) as Movie;
  } catch (e) {
    throw new Error('Not found');
  }
};

export const searchMovies = async (title: string, year?: string) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  try {
    const response = await fetch(`${baseUrl}&s=${title}${year ? `&y=${year}` : ''}`);
    return await response.json();
  } catch (e) {
    throw new Error('Not found');
  }
};

export const insertMovie = async (email: string, imdb_id: string, movie: Movie) => {
  const { data } = await supabase.from('my_movies').select('imdb_id').eq('email', email);
  const list = data as { imdb_id: string }[];
  const exists = list?.find((item) => item.imdb_id === imdb_id);

  if (exists) {
    throw new Error('Item is already in your list');
  }

  const { error } = await supabase.from('my_movies').insert({ email, imdb_id, movie: JSON.stringify(movie) });

  if (error) {
    throw new Error('Internal server error');
  }

  return true;
};

export const deleteMovie = async (email: string, imdb_id: string) => {
  const { error } = await supabase.from('my_movies').delete().eq('email', email).eq('imdb_id', imdb_id);

  if (error) {
    throw new Error('Internal server error');
  }

  return true;
};
