import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../../lib/graphql/typeDefs';
import { resolvers } from '../../lib/graphql/resolvers';

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

export default startServerAndCreateNextHandler(server);
