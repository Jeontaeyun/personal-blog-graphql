const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSign = (email: any) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        issuer: "connectDot"
    });
    return {
        code: 200,
        message: "토큰이 발급되었습니다.",
        token
    };
};
const jwtVerify = (req: any, token: any) => {
    try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        return;
    } catch (e) {
        return {
            code: 401,
            message: "유효하지 않은 토큰입니다."
        };
    }
};

export default {
    jwtSign,
    jwtVerify
};
