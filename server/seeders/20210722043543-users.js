'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 5,
        user_email: 'test@test.com',
        user_password:
          '$2a$10$vRSnElsAsZAcCx7YTmtmj.CpWeNfB.4cIJcTgR/zb9xI8kGtcNPq6', //test1234
        user_name: 'test',
        user_github: 'https://github.com/test',
        user_introduction: 'test 입니다.',
        user_photo:
          'https://user-images.githubusercontent.com/81145387/126490223-f3914368-22d1-4985-90dc-75cdea66b5dd.jpg',
      },
      {
        id: 1,
        user_email: 'jonga6431@gmail.com',
        user_password:
          '$2a$10$6J1mhcXnUy5P03DEIi5U/uvUT4xAIeNg6TTKGpf5Zyn5nKUheOy/y', // park1234
        user_name: 'jong-ah',
        user_github: 'https://github.com/jong-ah',
        user_introduction: 'jong-ah 입니다.',
        user_photo:
          'https://user-images.githubusercontent.com/81145387/126490779-433db8bd-d7bd-478d-8b5e-f43399c00b6e.jpg',
      },
      {
        id: 2,
        user_email: 'haeun.yah@gmail.com',
        user_password:
          '$2a$10$eiOoNzbVyzbpAnwPQEmhWOmC6MdY0fv7V3/yZ9bEzGUfTyog.1COm', // qwer1234
        user_name: 'vodkamitlime',
        user_github: 'https://github.com/vodkamitlime',
        user_introduction: 'vodkamitlime 입니다.',
        user_photo:
          'https://user-images.githubusercontent.com/81145387/126490792-98d03eb0-3376-44f3-b246-003292bec256.jpg',
      },
      {
        id: 3,
        user_email: 'idhyo0o@gmail.com',
        user_password:
          '$2a$10$s3969zwczs4Icyj0539DwOYcq90fClptQjPmzWGQb2.kypdZ8U0hG', // qwer1234
        user_name: 'hyoogu',
        user_github: 'https://github.com/hyoogu',
        user_introduction: 'hyoogu 입니다.',
        user_photo:
          'https://user-images.githubusercontent.com/81145387/126490798-2285caa6-2c48-4976-9076-c0b7efc5cef7.jpg',
      },
      {
        id: 4,
        user_email: 'bmanerdaniel@gmail.com',
        user_password:
          '$2a$10$Y5l9b3DunH2GN4KHefsSge0nTPrUow9PLEm.PNwaDhmLRf0eJY5Ve', // qwer1234
        user_name: 'bmaner',
        user_github: 'https://github.com/bmaner',
        user_introduction: 'bmaner 입니다.',
        user_photo:
          'https://user-images.githubusercontent.com/81145387/126490801-c293bfda-4adb-43a0-8779-34769199ba5e.jpg',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
