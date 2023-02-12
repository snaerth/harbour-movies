import { deleteMovie, getMovieById, getMyMovies, insertMovie, searchMovies } from '../../services/movie.service';
import { isImdbId } from '../../utils/isImdbId';

export const resolvers = {
  Query: {
    searchMovieById: async (_, { id }) => {
      return isImdbId(id) ? await getMovieById(id) : null;
    },
    searchMovieByTitle: async (_, { title, year }) => {
      const movies = await searchMovies(title, year);
      return movies.Search;
    },
    myMovies: async (_, { email }) => {
      return await getMyMovies(email);
    },
    addMovie: async (_, { email, imdb_id, movie }) => {
      return await insertMovie(email, imdb_id, movie);
    },
    removeMovie: async (_, { email, imdb_id }) => {
      return await deleteMovie(email, imdb_id);
    },
  },
};
