import gql from 'graphql-tag';

export const typeDefs = gql`
  input CreateListInput {
    name: String!
    email: String!
  }

  input CreateTODOListInput {
    name: String!
    email: String!
  }

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

  type TODOList {
    id: Int!
    created_at: String!
    name: String!
    email: String!
  }

  type TODOListItem {
    id: Int!
    created_at: String!
    desc: String!
    todo_list_id: Int!
    finished: Boolean!
  }

  type MovieListItem {
    id: Int!
    created_at: String!
    imdb_id: String!
    movie_list_id: Int!
    movie: Movie!
  }

  type Query {
    # Movies
    searchMovieById(id: String!): Movie
    searchMovieByTitle(title: String!, year: String): [SearchMovie]
    getMovieLists(email: String!): [MovieList!]!
    getMovieList(id: Int!): MovieList!
    getMovieListItems(listId: Int!): [MovieListItem!]!

    # TODOs
    getTODOLists(email: String!): [TODOList!]!
    getTODOList(id: Int!): TODOList!
    getTODOs(listId: Int!): [TODOListItem!]!
  }

  type Mutation {
    # Movies
    deleteList(id: Int!): Boolean!
    createList(input: CreateListInput!): MovieList!
    removeMovie(id: Int!, listId: Int!): Boolean!
    addMovie(imdbId: String!, listId: Int!): Movie!

    #  TODOs
    createTODOList(input: CreateTODOListInput!): TODOList!
    deleteTODOList(id: Int!): Boolean!
    addTODO(listId: Int!, desc: String!): TODOListItem!
    removeTODO(id: Int!, listId: Int!): Boolean!
    finishTODO(id: Int!, listId: Int!): TODOListItem!
  }
`;
