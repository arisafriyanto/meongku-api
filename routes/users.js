const { getUserById } = require("./../controllers/users");

const users = [
  {
    method: "GET",
    path: "/users/{uid}",
    handler: getUserById,
    options: {
      auth: "firebase",
    },
  },
];

module.exports = users;
