'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_by_users', [
      {
        "id": 1,
        "user_id": 1,
        "project_id": 1
      },
      {
        "id": 2,
        "user_id": 1,
        "project_id": 2
      },
      {
        "id": 3,
        "user_id": 2,
        "project_id": 3
      },
      {
        "id": 4,
        "user_id": 3,
        "project_id": 4
      },
      {
        "id": 5,
        "user_id": 4,
        "project_id": 5
      },
      {
        "id": 6,
        "user_id": 1,
        "project_id": 6
      },
      {
        "id": 7,
        "user_id": 2,
        "project_id": 6
      },
      {
        "id": 8,
        "user_id": 3,
        "project_id": 6
      },
      {
        "id": 9,
        "user_id": 4,
        "project_id": 6
      },
      {
        "id": 10,
        "user_id": 1,
        "project_id": 7
      },
      {
        "id": 11,
        "user_id": 2,
        "project_id": 7
      },
      {
        "id": 12,
        "user_id": 3,
        "project_id": 7
      },
      {
        "id": 13,
        "user_id": 4,
        "project_id": 7
      },
      {
        "id": 14,
        "user_id": 1,
        "project_id": 8
      },
      {
        "id": 15,
        "user_id": 2,
        "project_id": 8
      },
      {
        "id": 16,
        "user_id": 3,
        "project_id": 8
      },
      {
        "id": 17,
        "user_id": 4,
        "project_id": 8
      },
      {
        "id": 18,
        "user_id": 1,
        "project_id": 9
      },
      {
        "id": 19,
        "user_id": 2,
        "project_id": 9
      },
      {
        "id": 20,
        "user_id": 3,
        "project_id": 9
      },
      {
        "id": 21,
        "user_id": 4,
        "project_id": 9
      },
      {
        "id": 22,
        "user_id": 1,
        "project_id": 10
      },
      {
        "id": 23,
        "user_id": 2,
        "project_id": 10
      },
      {
        "id": 24,
        "user_id": 3,
        "project_id": 10
      },
      {
        "id": 25,
        "user_id": 4,
        "project_id": 10
      },
      {
        "id": 26,
        "user_id": 1,
        "project_id": 11
      },
      {
        "id": 27,
        "user_id": 2,
        "project_id": 11
      },
      {
        "id": 28,
        "user_id": 3,
        "project_id": 11
      },
      {
        "id": 29,
        "user_id": 4,
        "project_id": 11
      },
      {
        "id": 30,
        "user_id": 1,
        "project_id": 12
      },
      {
        "id": 31,
        "user_id": 4,
        "project_id": 12
      },
      {
        "id": 32,
        "user_id": 1,
        "project_id": 13
      },
      {
        "id": 33,
        "user_id": 4,
        "project_id": 13
      },
      {
        "id": 34,
        "user_id": 1,
        "project_id": 14
      },
      {
        "id": 35,
        "user_id": 4,
        "project_id": 14
      },
      {
        "id": 36,
        "user_id": 2,
        "project_id": 15
      },
      {
        "id": 37,
        "user_id": 3,
        "project_id": 15
      },
      {
        "id": 38,
        "user_id": 2,
        "project_id": 16
      },
      {
        "id": 39,
        "user_id": 3,
        "project_id": 16
      },
      {
        "id": 40,
        "user_id": 2,
        "project_id": 17
      },
      {
        "id": 41,
        "user_id": 3,
        "project_id": 18
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('project_by_users', null, {});

  }
};
