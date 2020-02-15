"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const chalk_1 = __importDefault(require("chalk"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = __importDefault(require("./graphql"));
const models_1 = __importDefault(require("./models"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
dotenv_1.default.config();
const environment = process.env.NODE_ENV;
const apollo = new apollo_server_express_1.ApolloServer(Object.assign(Object.assign({}, graphql_1.default), { playground: {
        settings: {
            "request.credentials": "include"
        }
    }, context: ({ req }) => {
        let user = null;
        if (req.user) {
            user = req.user.toJSON();
        }
        if (!user) {
            console.log("유저가 존재하지 않습니다.");
            return { database: models_1.default, req };
        }
        return { database: models_1.default, user, req };
    } }));
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: true,
    credentials: true
}));
app.use("/", express_1.default.static("public"));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
app.use(express_session_1.default({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: "sefqfzveeff"
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
models_1.default.Sequelize.sync().then(() => {
    apollo.applyMiddleware({ app, path: "/graphql" });
    app.listen({ port: 8080 }, () => {
        console.log(chalk_1.default.bgBlue.black("START"), `Apollo Server ready at http${apollo.graphqlPath}`);
    });
});
//# sourceMappingURL=app.js.map