"use strict";
// FirstMigration
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(`Comments`, "RecommentId", {
            type: Sequelize.INTEGER,
            references: {
                model: "comments",
                key: "id",
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Comments", "RecommentId");
    },
};
