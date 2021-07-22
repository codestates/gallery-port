'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stack_for_projects', [
      {
        "id": 18,
        "stack_id": 1,
        "project_id": 1
      },
      {
        "id": 1,
        "stack_id": 2,
        "project_id": 1
      },
      {
        "id": 2,
        "stack_id": 1,
        "project_id": 2
      },
      {
        "id": 3,
        "stack_id": 1,
        "project_id": 3
      },
      {
        "id": 4,
        "stack_id": 1,
        "project_id": 4
      },
      {
        "id": 5,
        "stack_id": 2,
        "project_id": 5
      },
      {
        "id": 6,
        "stack_id": 2,
        "project_id": 6
      },
      {
        "id": 7,
        "stack_id": 3,
        "project_id": 7
      },
      {
        "id": 8,
        "stack_id": 3,
        "project_id": 8
      },
      {
        "id": 9,
        "stack_id": 3,
        "project_id": 9
      },
      {
        "id": 10,
        "stack_id": 4,
        "project_id": 10
      },
      {
        "id": 11,
        "stack_id": 4,
        "project_id": 11
      },
      {
        "id": 12,
        "stack_id": 5,
        "project_id": 12
      },
      {
        "id": 13,
        "stack_id": 5,
        "project_id": 13
      },
      {
        "id": 14,
        "stack_id": 1,
        "project_id": 14
      },
      {
        "id": 15,
        "stack_id": 1,
        "project_id": 15
      },
      {
        "id": 16,
        "stack_id": 6,
        "project_id": 16
      },
      {
        "id": 17,
        "stack_id": 1,
        "project_id": 17
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('stack_for_projects', null, {});

  }
};
