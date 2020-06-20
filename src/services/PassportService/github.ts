import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import database from "../../models/mysql";
import { PLATFORM } from "types/services/User";
import { ENV } from "config";

export default () => {
    const config = {
        clientID: ENV.GITHUB_CLIENT_ID,
        clientSecret: ENV.GITHUB_CLIENT_SECRET,
        callbackURL: ENV.GITHUB_CLIENT_CALLBACK
    };
    passport.use(
        new GitHubStrategy(config, async function(accessToken: string, refreshToken: string, profile: any, done: any) {
            try {
                const exUser = await database.User.findOne({
                    where: { userId: profile.id, platform: PLATFORM.GITHUB }
                });
                if (exUser) {
                    return done(null, exUser);
                } else {
                    const newUser = await database.User.create({
                        userId: profile.id,
                        nickName: profile.displayName,
                        platform: PLATFORM.GITHUB
                    });
                    done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        })
    );
};
