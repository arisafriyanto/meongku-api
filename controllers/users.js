const { doc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

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
