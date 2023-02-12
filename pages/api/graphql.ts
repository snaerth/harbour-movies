import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../../lib/graphql/typeDefs';
import { resolvers } from '../../lib/graphql/resolvers';

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
