import database from "../models/mysql";

export default async () => {
    try {
        await database.Sequelize!.sync();
        return database;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
