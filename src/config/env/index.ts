import dotenv from "dotenv";
dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 8080,
    COOKIE_SECRET: process.env.COOKIE_SECRET || "",
    SESSION_NAME: process.env.SESSION_NAME || "",

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_CLIENT_CALLBACK: process.env.GOOGLE_CLIENT_CALLBACK || "",

    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID || "",
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET || "",
    KAKAO_CLIENT_CALLBACK: process.env.KAKAO_CLIENT_CALLBACK || ""
};
