const { doc, getDoc, updateDoc } = require("firebase/firestore");
const { auth, db } = require("../config/firebase");
const { signInWithEmailAndPassword, updatePassword } = require("firebase/auth");

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

const editProfile = async (uid, name, phone) => {
  try {
    //? Update user data in firestore
    const userDoc = doc(db, "users", uid);
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    await updateDoc(userDoc, updateData);

    return true;
  } catch (error) {
    throw error;
  }
};

const editPassword = async (uid, email, currentPassword, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      currentPassword
    );

    if (user.uid === uid) {
      if (password) await updatePassword(user, password);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserData, editProfile, editPassword };
