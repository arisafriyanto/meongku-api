const Hapi = require("@hapi/hapi");
const home = require("./routes/home");
const users = require("./routes/users");
const Boom = require("@hapi/boom");
const admin = require("./config/firebase");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.auth.scheme("firebase", () => {
    return {
      authenticate: async (request, h) => {
        try {
          const authorizationHeader = request.headers.authorization;
          if (!authorizationHeader) {
            return Boom.unauthorized("Token tidak diterima");
          }

          const idToken = authorizationHeader.replace("Bearer ", "");

          const decodedToken = await admin.auth().verifyIdToken(idToken);

          const credentials = {
            // Tambahkan informasi pengguna yang diperlukan
            uid: decodedToken.uid,
            name: decodedToken.name,
          };

          return h.authenticated({ credentials });
        } catch (error) {
          return Boom.notFound("User tidak ditemukan");
        }
      },
    };
  });

  server.auth.strategy("firebase", "firebase");

  server.route(home);
  server.route(users);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
