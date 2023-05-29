const admin = require("firebase-admin");
const serviceAccount = require("./../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://<your-firebase-project>.firebaseio.com",
});

module.exports = admin;
