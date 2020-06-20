import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import database from "models/mysql";
import { PLATFORM } from "types/services/User";
import { ENV } from "config";

export default () => {
    const config = {
        clientID: ENV.GOOGLE_CLIENT_ID,
        clientSecret: ENV.GOOGLE_CLIENT_SECRET,
        callbackURL: ENV.GOOGLE_CLIENT_CALLBACK
    };
    passport.use(
        new GoogleStrategy(config, async function(accessToken, refreshToken, profile: Profile, done) {
            try {
                const exUser = await database.User.findOne({
                    where: { userId: profile.id, platform: PLATFORM.GOOGLE }
                });
                if (exUser) {
                    return done(undefined, exUser);
                } else {
                    const newUser = await database.User.create({
                        userId: profile.id,
                        nickName: profile.displayName,
                        platform: PLATFORM.GOOGLE
                    });
                    done(undefined, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        })
    );
};
