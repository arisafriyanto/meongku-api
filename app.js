const Hapi = require("@hapi/hapi");
const admin = require("./config/firebase-admin");
const auth = require("./routes/auth");
const home = require("./routes/home");
const users = require("./routes/users");
const articles = require("./routes/articles");
const cats = require("./routes/cats");
const Boom = require("@hapi/boom");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.auth.scheme("firebase", () => {
    return {
      authenticate: async (request, h) => {
        try {
          const authorizationHeader = request.headers.authorization;
          if (!authorizationHeader) {
            return Boom.unauthorized("Authentication id token does not exist");
          }

          const idToken = authorizationHeader.replace("Bearer ", "");
          const decodedToken = await admin.auth().verifyIdToken(idToken);

          const credentials = {
            //? Tambahkan informasi pengguna yang diperlukan
            user_uid: decodedToken.uid,
            email: decodedToken.email,
          };

          return h.authenticated({ credentials });
        } catch (error) {
          return Boom.forbidden(
            "Access denied. You do not have permission to access this page"
          );
        }
      },
    };
  });

  server.auth.strategy("firebase", "firebase");

  server.route(auth);
  server.route(home);
  server.route(articles);
  server.route(users);
  server.route(cats);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
