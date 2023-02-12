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

  type Query {
    myMovies(email: String): [Movie!]!
    movie(title: String!, year: String): Movie
    # movie argument is movie object converted to string
    addMovie(email: String!, imdb_id: String!, movie: String!): Boolean
    removeMovie(email: String!, imdb_id: String!): Boolean
    searchMovieById(id: String!): Movie
    searchMovieByTitle(title: String!, year: String): [SearchMovie]
  }
`;
