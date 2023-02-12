import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../../lib/graphql/typeDefs';
import { resolvers } from '../../lib/graphql/resolvers';

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'my-graph@current',
    }),
  ],
});

export default startServerAndCreateNextHandler(server);
