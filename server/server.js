const express = require('express');
const db = require('./config/connection');
const path = require('path');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const URL_HEROKU = 'https://ancient-everglades-97703-e6a603057067.herokuapp.com/'; //add heroku url

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const corsOption = {
  origin: ['http://localhost:3000/graphQL','http://localhost:3001/graphQL', URL_HEROKU],
  credentials: true
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors(corsOption));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, cors:false });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  // Call the async function to start the server
  startApolloServer();
  
