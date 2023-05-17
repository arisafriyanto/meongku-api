const { Boom } = require("@hapi/boom");

const getUserById = (request, h) => {
  const { name } = request.auth.credentials;
  const { uid } = request.auth.credentials.uid;
  const { requestUid } = request.params;

  if (uid === requestUid) {
    return h.response({
      statusCode: 200,
      message: `Hello ${name}! Ini adalah profile kamu`,
    });
  }

  return Boom.notFound("User tidak ditemukan");
};

module.exports = { getUserById };
