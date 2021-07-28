'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('project_contents', [
      {
        "id": 1,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496115-53b6fc44-7d03-47de-b52f-750efd5101d9.jpg",
        "project_id": 1
      },
      {
        "id": 2,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496134-3020e2b7-746b-4bb6-b2f7-129cb155dfb4.jpg",
        "project_id": 2
      },
      {
        "id": 3,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496148-531abeb4-bc67-4026-90b8-cde86ae68c11.jpg",
        "project_id": 3
      },
      {
        "id": 4,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496158-53537f5c-82fe-4524-a91d-97040d92c001.jpg",
        "project_id": 4
      },
      {
        "id": 5,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496170-309f3e49-9021-436c-b343-d1be1993ec2c.jpg",
        "project_id": 5
      },
      {
        "id": 6,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496180-a2abbdb9-7be0-47d7-bb4d-ad0c5aadfe1a.jpg",
        "project_id": 6
      },
      {
        "id": 7,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496198-b82b2843-502a-4020-b87e-33b13a6193fc.jpg",
        "project_id": 6
      },
      {
        "id": 8,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496205-d90db165-d16e-453d-8176-e9177d4fda8b.jpg",
        "project_id": 7
      },
      {
        "id": 9,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496216-02e4cd5a-5d43-4cdf-afc1-2fd943c531a0.jpg",
        "project_id": 8
      },
      {
        "id": 10,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496277-afbe4a49-c78f-4afc-96b2-8498e9f87323.jpg",
        "project_id": 9
      },
      {
        "id": 11,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496294-698587bb-4c9d-4e1c-a990-fe62bd82b70c.jpg",
        "project_id": 10
      },
      {
        "id": 12,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496302-bebcf547-0f95-47cb-b8e1-e02ff732d918.jpg",
        "project_id": 11
      },
      {
        "id": 13,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496309-d836616d-6d02-4598-8ede-c1415cc966a7.jpg",
        "project_id": 11
      },
      {
        "id": 14,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496320-72ebe678-c319-4aa8-af20-a4666d70e514.jpg",
        "project_id": 12
      },
      {
        "id": 15,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496327-9ee9b033-10d2-4381-91ce-9edc9a49bf5a.jpg",
        "project_id": 13
      },
      {
        "id": 16,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496341-7e95837b-ef74-4623-b3be-57c745f66ccb.jpg",
        "project_id": 14
      },
      {
        "id": 17,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496352-c3dcbe98-7fd6-4e71-ab6e-64bd60b0cec4.jpg",
        "project_id": 14
      },
      {
        "id": 18,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496361-13c8bb62-d1a1-40bf-a6f1-9ada51718642.jpg",
        "project_id": 15
      },
      {
        "id": 19,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496371-63925f1f-e9b0-477a-b68a-54b7eecd6b87.jpg",
        "project_id": 15
      },
      {
        "id": 20,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496378-80892684-ca5e-4824-9192-df1b6a80f5ed.jpg",
        "project_id": 16
      },
      {
        "id": 21,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496386-ff9d3618-f532-4c7e-8a35-31dc2c6e1861.jpg",
        "project_id": 17
      },
      {
        "id": 22,
        "content_text": "이미지에 관련된 설명입니다.",
        "content_image": "https://user-images.githubusercontent.com/81145387/126496101-1bc89289-fc66-422b-9450-c1b7eb6352c9.jpg",
        "project_id": 18
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('project_contents', null, {});

  }
};
