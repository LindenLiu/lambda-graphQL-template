import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: (_, { }) => {
      const returnValue = 'Hello World!'
      return returnValue
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql/playground",
    settings: {
      'request.credentials': 'include'
    }
  }
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});