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
const passport = require("services/passport");
const { Strategy: LocalStartegy } = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const db = require("../../models");
module.exports = () => {
    passport.use(new LocalStartegy({
        usernameField: "userId",
        passwordField: "password"
    }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield db.User.findOne({
                where: { userId: username }
            });
            if (!user) {
                return done(null, false, { reason: "존재하지 않는 사용자입니다." });
            }
            bcrypt.compare(password, user.password, (e, result) => {
                if (result)
                    return done(null, user);
                else
                    return done(null, false, { reason: "틀린 비밀번호 입니다." });
            });
        }
        catch (e) {
            console.error(e);
            return done(e);
        }
    })));
};
//# sourceMappingURL=local.js.map