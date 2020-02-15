import database from "../models";

export default async () => {
    try {
        await database.Sequelize!.sync();
        return database;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
