const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchema } = require('@graphql-tools/load');
const { addMocksToSchema } = require('@graphql-tools/mock');
const path = require('path');

const { listZellerCustomers } = require('./src/graphql/listZellerCustomers.js');
const { getZellerCustomer } = require('./src/graphql/getZellerCustomer.js');

const runServer = async () => {
  const schema = await loadSchema(path.resolve(__dirname, './src/graphql/schema.gql'), {
    loaders: [new GraphQLFileLoader()],
  });

  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema,
      resolvers: {
        Query: {
          listZellerCustomers: (_, args) => {
            if (!args?.role) return listZellerCustomers;
            return {
              items: listZellerCustomers.items.filter(user => user.role === args.role),
              nextToken: null
            };
          },
          getZellerCustomer: () => getZellerCustomer,
        },
      },
    }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 9002 },
  });

  console.log(`🚀 Server is running at ${url}`);
};

runServer();
