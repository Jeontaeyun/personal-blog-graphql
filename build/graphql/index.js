"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = __importDefault(require("./resolvers"));
const schema_1 = __importDefault(require("./schema"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    resolvers: resolvers_1.default,
    typeDefs: apollo_server_express_1.gql(schema_1.default)
};
//# sourceMappingURL=index.js.map