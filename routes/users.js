const Boom = require("@hapi/boom");
const { getUserData } = require("./../controllers/users");

const users = {
  method: "GET",
  path: "/users/{uid}",
  handler: async (request, h) => {
    const { verifyUid } = request.auth.credentials;
    const { uid } = request.params;

    try {
      if (verifyUid !== uid) {
        return Boom.badRequest("Token not valid to user");
      }

      const data = await getUserData(uid);

      if (data) {
        return h.response({
          status: "success",
          message: "User data found",
          data: {
            name: data.name,
            email: data.email,
          },
        });
      } else {
        return Boom.notFound("No user data found");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    auth: "firebase",
  },
};

module.exports = [users];
