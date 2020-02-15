import dotenv from "dotenv";
import sequelizeConfig from "./sequelizeConfig";
dotenv.config();
/**
 * It can helpful to reduce process.env.XXXX
 */

export default {
    port: process.env.PORT,
    sequelizeConfig: { ...sequelizeConfig }
};
