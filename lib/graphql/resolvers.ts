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
import {
  deleteTODOList,
  createTODOList,
  addTODO,
  removeTODO,
  getTODOLists,
  getTODOs,
  getTODOList,
} from '../../services/todo.service';

export const resolvers = {
  Mutation: {
    /**
     * Movie mutations
     */
    addMovie: async (_, { imdbId, listId }) => {
      const movie = await getMovieById(imdbId);
      return addMovie({
        imdbId,
        listId,
        movie,
      });
    },
    removeMovie: (_, { id, listId }) => {
      return removeMovie(id, listId);
    },
    createList: (_, { input: { name, email } }) => {
      return createList(name, email);
    },
    deleteList: (_, { id }) => {
      return deleteMovieList(id);
    },

    /**
     * TODOs mutations
     */
    createTODOList: (_, { input: { name, email } }) => {
      return createTODOList({ name, email });
    },
    deleteTODOList: (_, { id }) => {
      return deleteTODOList(id);
    },
    addTODO: (_, { listId, desc }) => {
      return addTODO({
        listId,
        desc,
      });
    },
    removeTODO: (_, { id, listId }) => {
      return removeTODO(id, listId);
    },
  },
  Query: {
    /**
     * Movies queries
     */
    searchMovieById: async (_, { id }) => {
      return isImdbId(id) ? await getMovieById(id) : null;
    },
    searchMovieByTitle: async (_, { title, year }) => {
      const movies = await searchMovies(title, year);
      return movies.Search;
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

    /**
     * TODO queries
     */
    getTODOLists: (_, { email }) => {
      return getTODOLists(email);
    },
    getTODOList: (_, { id }) => {
      return getTODOList(id);
    },
    getTODOs: (_, { listId }) => {
      return getTODOs(listId);
    },
  },
};
