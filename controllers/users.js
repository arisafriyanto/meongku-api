const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");
const Boom = require("@hapi/boom");

// const getUserById = (request, h) => {
//   const { email } = request.auth.credentials;
//   const { uid } = request.auth.credentials.uid;
//   const { requestUid } = request.params;

//   console.log(request.auth.credentials);

//   if (uid === requestUid) {
//     return h.response({
//       statusCode: 200,
//       message: `Hello ${email}! Ini adalah profile kamu`,
//     });
//   }

//   return Boom.notFound("User tidak ditemukan");
// };

const getUserData = async (uid) => {
  try {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserData };
