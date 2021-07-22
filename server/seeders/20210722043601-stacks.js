'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('stacks', [
      {
        "id": 1,
        "stack_name": "etc"
      },
      {
        "id": 2,
        "stack_name": "javascript"
      },
      {
        "id": 3,
        "stack_name": "sql"
      },
      {
        "id": 4,
        "stack_name": "python"
      },
      {
        "id": 5,
        "stack_name": "java"
      },
      {
        "id": 6,
        "stack_name": "c#"
      },
      {
        "id": 7,
        "stack_name": "php"
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('stacks', null, {});

  }
};
