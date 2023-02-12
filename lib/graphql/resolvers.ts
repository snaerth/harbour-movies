import {
  removeMovie,
  getMovieById,
  addMovie,
  searchMovies,
  createList,
  deleteMovieList,
  getMovieLists,
  getMovieList,
  getMovieListItems,
} from '../../services/movie.service';
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
    addMovie: async (_, { imdbId, listId }) => {
      const movie = await getMovieById(imdbId);
      return addMovie({
        imdbId,
        listId,
        movie,
      });
    },
    removeMovie: (_, { id }) => {
      return removeMovie(id);
    },
    createList: (_, { name, email }) => {
      return createList(name, email);
    },
    deleteList: (_, { id }) => {
      return deleteMovieList(id);
    },
    getMovieLists: (_, { email }) => {
      return getMovieLists(email);
    },
    getMovieList: (_, { id }) => {
      return getMovieList(id);
    },
    getMovieListItems: (_, { listId }) => {
      return getMovieListItems(listId);
    },
  },
};
