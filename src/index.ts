import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import fs from "fs";

import { ApolloServer } from "apollo-server-express";
import graphqlConfig from "./graphql";
import { jwtSign, jwtVerify } from "./graphql/authentication";

import db from "./models";

import passport from "passport";
import passportConfig from "./passport";

import dotenv from "dotenv";
import morgan from "morgan";

import https from "https";
import http from "http";
// Express App Init
const app = Express();
dotenv.config();

const environment = process.env.NODE_ENV;

// Apollo Server Init
const apollo = new ApolloServer({
    ...graphqlConfig,
    playground: {
        settings: {
            "request.credentials": "include",
        },
    },
    // Context object is one that gets passed to every single resolvers
    // at every level.
    context: ({ req }: { req: Express.Request & { user: any } }) => {
        let user = null;
        if (req.user) {
            user = req.user.toJSON();
        }
        if (!user) {
            console.log("유저가 존재하지 않습니다.");
            return { db, req };
        }
        return { db, user, req };
    },
});

// Express Environment Setting
app.use(morgan("dev"));
app.use(Express.json());
// JSON형태의 본문을 처리하는 express 미들웨어
app.use(Express.urlencoded({ extended: true }));
// FORM을 처리해주는 express 미들웨어
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use("/", Express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "sefqfzveeff",
    }),
);
app.use(passport.initialize());
app.use(passport.session());

//Database Init
db.sequelize.sync();

// Express API
apollo.applyMiddleware({ app, path: "/graphql" });

//Starting Express App
app.listen({ port: 8080 }, () => {
    console.log(`Apollo Server ready at http${apollo.graphqlPath}`);
});
