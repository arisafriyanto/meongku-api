const { doc, getDoc, updateDoc } = require("firebase/firestore");
const { auth, db } = require("../config/firebase");
const {
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} = require("firebase/auth");

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

const editProfile = async (
  uid,
  name,
  email,
  password,
  phone,
  currentEmail,
  currentPassword
) => {
  try {
    //* Sign in the user to get the user object
    const { user } = await signInWithEmailAndPassword(
      auth,
      currentEmail,
      currentPassword
    );

    if (user.uid === uid) {
      //* Update user data in firestore
      const userDoc = doc(db, "users", uid);
      const updateData = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;

      await updateDoc(userDoc, updateData);

      //* Update authentication information

      if (email) await updateEmail(user, email);
      if (password) await updatePassword(user, password);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "The email address is already in use by another account."
      );
    } else {
      throw error;
    }
  }
};

const editPassword = async(email, currentPassword, newPassword) => {
  try {
    const { result } = await signInWithEmailAndPassword(
      auth,
      email,
      currentPassword
      );
  
      if (result.uid === uid) {
        if (newPassword) await updatePassword(result, newPassword);
          return true;;
      } else {
        return false;
      }
  } catch(error) {
    throw error;
  }
};

module.exports = { getUserData, editProfile, editPassword };
