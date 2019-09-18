const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();

dotenv.config();

const server = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers
});
app.use(morgan('dev'));
app.use(express.json());
// JSON형태의 본문을 처리하는 express 미들웨어
app.use(express.urlencoded({ extended: true }));
// FORM을 처리해주는 express 미들웨어
app.use(
	cors({
		origin: true,
		credentials: true
	})
);
app.use('/', express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
