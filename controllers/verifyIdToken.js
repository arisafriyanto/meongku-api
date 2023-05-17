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
