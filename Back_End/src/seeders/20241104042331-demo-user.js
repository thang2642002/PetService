"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "User",
      [
        {
          email: "demo@demo.com",
          password: "123456",
          user_name: "thang",
          phone: "938059505",
          address: "BD",
          role: "manager",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User", null, {});
  },
};
