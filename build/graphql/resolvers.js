"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postQuery_1 = __importDefault(require("./queryFunction/postQuery"));
const categoryQuery_1 = __importDefault(require("./queryFunction/categoryQuery"));
const postMutation_1 = __importDefault(require("./mutationFunction/postMutation"));
const userMutation_1 = __importDefault(require("./mutationFunction/userMutation"));
const commentMutation_1 = __importDefault(require("./mutationFunction/commentMutation"));
const categoryMutation_1 = __importDefault(require("./mutationFunction/categoryMutation"));
const likeMutation_1 = __importDefault(require("./mutationFunction/likeMutation"));
exports.default = {
    Query: Object.assign(Object.assign(Object.assign({}, postQuery_1.default), categoryQuery_1.default), { user: (_, { userId }, { db, req }, info) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db.User.findOne({ where: { userId } });
        }) }),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, commentMutation_1.default), userMutation_1.default), postMutation_1.default), likeMutation_1.default), categoryMutation_1.default)
};
//# sourceMappingURL=resolvers.js.map