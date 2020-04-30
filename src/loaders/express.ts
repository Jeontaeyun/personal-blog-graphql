import Express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession, { SessionOptions } from "express-session";
import passport from "passport";
import { passportConfig } from "../services/PassportService";
import { ENV } from "config";

const sessionOption: SessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: ENV.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: ENV.SESSION_NAME
};

if (ENV.NODE_ENV === "production") {
    sessionOption.proxy = true;
    if (sessionOption.cookie) {
        sessionOption.cookie.secure = true;
    }
}

export default async ({ app }: { app: Express.Application }) => {
    passportConfig();
    // Express dev logging middleware
    app.use(morgan("dev"));

    app.use(Express.json());
    // Middleware for form
    app.use(Express.urlencoded({ extended: true }));
    /**
     * CORS SOP(Same-origin-policy) Policy configuration
     */
    app.use(
        cors({
            origin: "*",
            credentials: true
        })
    );
    app.use("/", Express.static("public"));
    /**
     * SecretKey for session and cookie
     */
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(expressSession(sessionOption));

    /**
     * Passport Configuration
     */
    app.use(passport.initialize());
    app.use(passport.session());
    return app;
};
