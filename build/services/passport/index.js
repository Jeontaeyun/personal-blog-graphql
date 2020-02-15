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
const db = require("../../models");
const local = require("./local");
module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield db.User.findOne({
                where: { id }
            });
            return done(null, user);
        }
        catch (e) {
            console.error(e);
            return done(e);
        }
    }));
    local();
};
//# sourceMappingURL=index.js.map