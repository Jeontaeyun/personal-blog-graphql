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
const apollo_server_express_1 = require("apollo-server-express");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../services/passport"));
passport_2.default();
const loginFunction = (userId, password, req) => __awaiter(void 0, void 0, void 0, function* () {
    return passport_1.default.authenticate("local", (error, user, info) => {
        if (error) {
            throw new Error(error);
        }
        if (info)
            throw info.reason;
        if (!user) {
            throw new Error("유저가 존재하지 않습니다.");
        }
        req.login((logginedUser, loginError) => {
            if (loginError) {
                throw new Error(loginError);
            }
            return logginedUser;
        });
    })({ body: { userId, password } });
});
const createUser = (_, { userId, password, nickname, grant }, { db }, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exUser = yield db.User.findOne({ where: { userId } });
        if (exUser)
            return new apollo_server_express_1.UserInputError("Username is taken", {
                errors: {
                    username: "This username is taken"
                }
            });
        const hashingUser = new Promise((resolve, reject) => {
            bcrypt_nodejs_1.default.hash(password, null, null, (error, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    throw new Error(error);
                }
                const newUser = yield db.User.create({
                    userId,
                    password: hashedPassword,
                    nickname,
                    grant
                });
                return resolve(newUser.toJSON());
            }));
        });
        return yield hashingUser;
    }
    catch (e) {
        console.error(e);
    }
});
const login = (_, { userId, password }, { req, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        const user = yield loginFunction(userId, password, req);
        return user;
    }
    else
        return new Error("이미 로그인 하였습니다. 로그아웃 해주세요");
});
const logout = (_, args, { req, user }, info) => {
    if (user) {
        const logoutedUser = user;
        req.logout();
        return logoutedUser;
    }
    else
        return new Error("로그인 된 유저가 없습니다.");
};
exports.default = {
    createUser,
    login,
    logout
};
//# sourceMappingURL=userMutation.js.map