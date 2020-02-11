const passport = require("services/passport");
const { Strategy: LocalStartegy } = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const db = require("../../models");

module.exports = () => {
    passport.use(
        new LocalStartegy(
            {
                usernameField: "userId",
                passwordField: "password"
            },
            async (username, password, done) => {
                try {
                    const user = await db.User.findOne({
                        where: { userId: username }
                    });
                    if (!user) {
                        return done(null, false, { reason: "존재하지 않는 사용자입니다." });
                    }
                    bcrypt.compare(password, user.password, (e, result) => {
                        if (result) return done(null, user);
                        else return done(null, false, { reason: "틀린 비밀번호 입니다." });
                    });
                } catch (e) {
                    console.error(e);
                    return done(e);
                }
            }
        )
    );
};
