import passport from "passport";
import { Strategy as KakaoStrategy, Profile } from "passport-kakao";
import database from "models/mysql";
import { PLATFORM } from "types/services/User";
import { ENV } from "config/index";

export default () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: ENV.KAKAO_CLIENT_ID,
                clientSecret: ENV.KAKAO_CLIENT_SECRET,
                callbackURL: ENV.KAKAO_CLIENT_CALLBACK
            },
            async function(accessToken, refreshToken, profile: Profile, done) {
                try {
                    const exUser = await database.User.findOne({
                        where: { userId: profile.id, platform: PLATFORM.KAKAO }
                    });
                    if (exUser) {
                        return done(null, exUser);
                    } else {
                        const newUser = await database.User.create({
                            userId: profile.id,
                            nickName: profile.displayName,
                            email: profile._json && profile._json.kaccount_email,
                            platform: PLATFORM.KAKAO
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
