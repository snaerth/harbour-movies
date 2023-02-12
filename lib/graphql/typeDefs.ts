import gql from 'graphql-tag';

export const typeDefs = gql`
  type Rating {
    Source: String
    Value: String
  }

  type Movie {
    Title: String
    Year: String
    Rated: String
    Released: String
    Runtime: String
    Genre: String
    Director: String
    Writer: String
    Actors: String
    Plot: String
    Language: String
    Country: String
    Awards: String
    Poster: String
    Ratings: [Rating]
    Metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    Type: String
    DVD: String
    BoxOffice: String
    Production: String
    Website: String
    Response: String
  }

  type SearchMovie {
    Poster: String
    Title: String
    Type: String
    Year: String
    imdbID: String
  }

  type MovieList {
    id: Int!
    created_at: String!
    name: String!
    email: String!
  }

  type MovieListItem {
    id: Int!
    created_at: String!
    imdb_id: String!
    movie_list_id: Int!
    movie: Movie!
  }

  type Query {
    addMovie(imdbId: String!, listId: Int!): Boolean
    removeMovie(id: Int!): Boolean
    searchMovieById(id: String!): Movie
    searchMovieByTitle(title: String!, year: String): [SearchMovie]
    createList(name: String!, email: String!): MovieList!
    deleteList(id: Int!): Boolean!
    getMovieLists(email: String!): [MovieList!]!
    getMovieList(id: Int!): MovieList!
    getMovieListItems(listId: Int!): [MovieListItem!]!
  }
`;
