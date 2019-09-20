const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const db = require('./models');

const dotenv = require('dotenv');
const morgan = require('morgan');

// Express App Init
const app = express();
dotenv.config();

// Apollo Server Init
const server = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers
});

// Express Environment Setting
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
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	expressSession({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: false
		},
		name: 'sefqfzveeff'
	})
);

//Database Init
db.sequelize.sync();

// Express API
server.applyMiddleware({ app, path: '/graphql' });

//Starting Express App
app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
