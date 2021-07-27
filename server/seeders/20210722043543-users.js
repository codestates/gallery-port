'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        "id": 5,
        "user_email": "test@test.com",
        "user_password": "$2a$10$YDiDTrNp.9OIKmGuiOoUReVEEQMTAhLMTX5loa0kRb23/1RVim5mi", //test1234
        "user_name": "test",
        "user_github": "https://github.com/test",
        "user_introduction": "test 입니다.",
        "user_photo": "https://user-images.githubusercontent.com/81145387/126490223-f3914368-22d1-4985-90dc-75cdea66b5dd.jpg"
      },
      {
        "id": 1,
        "user_email": "jonga6431@gmail.com",
        "user_password": "$2a$10$mRTsTHf4flVK8c.14KE/B./LPTjpbW06ZUP2ljgGXGfZKlpxrbrRi", // park1234
        "user_name": "jong-ah",
        "user_github": "https://github.com/jong-ah",
        "user_introduction": "jong-ah 입니다.",
        "user_photo": "https://user-images.githubusercontent.com/81145387/126490779-433db8bd-d7bd-478d-8b5e-f43399c00b6e.jpg"
      },
      {
        "id": 2,
        "user_email": "haeun.yah@gmail.com",
        "user_password": "$2a$10$GjVgDNo8dje79MdzOSXx4uKhKhnKOVLYJnuKsE3f1SX22Jicl4IPm", // qwer1234
        "user_name": "vodkamitlime",
        "user_github": "https://github.com/vodkamitlime",
        "user_introduction": "vodkamitlime 입니다.",
        "user_photo": "https://user-images.githubusercontent.com/81145387/126490792-98d03eb0-3376-44f3-b246-003292bec256.jpg"
      },
      {
        "id": 3,
        "user_email": "idhyo0o@gmail.com",
        "user_password": "$2a$10$FIzKCAre/e8yHHUaPD2pveo8gVzZ/YeMAPFpVHszj3IWHA4J1pO8.", // qwer1234
        "user_name": "hyoogu",
        "user_github": "https://github.com/hyoogu",
        "user_introduction": "hyoogu 입니다.",
        "user_photo": "https://user-images.githubusercontent.com/81145387/126490798-2285caa6-2c48-4976-9076-c0b7efc5cef7.jpg"
      },
      {
        "id": 4,
        "user_email": "bmanerdaniel@gmail.com",
        "user_password": "$2a$10$OPVKYkYbY/uppsoLsdR0LOxujm4aM8wrGXGsEhgv3t9.LrNk6nvhm", // qwer1234
        "user_name": "bmaner",
        "user_github": "https://github.com/bmaner",
        "user_introduction": "bmaner 입니다.",
        "user_photo": "https://user-images.githubusercontent.com/81145387/126490801-c293bfda-4adb-43a0-8779-34769199ba5e.jpg"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {})

  }
};
