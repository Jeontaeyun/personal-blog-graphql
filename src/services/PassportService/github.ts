import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import database from "../../models";

export default () => {
    passport.use(
        new GitHubStrategy(
            {
                clientID: "...",
                clientSecret: "...",
                callbackURL: " ..."
            },
            (acessToken: string, refreshToken: string, profile: any, cb: any) => {
                database.User.findOrCreate({ userId: profile.id }, (error: any, user) => {
                    return cb(error, user);
                });
            }
        )
    );
};
