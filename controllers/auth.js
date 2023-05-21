const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");
const { auth, db } = require("./../config/firebase");

const registerUser = async (name, email, password, phone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userDoc = doc(db, "users", user.uid);

    await setDoc(userDoc, {
      name,
      email,
      phone,
    });

    return userCredential;
  } catch (error) {
    // console.log("Error registering user:", error);
    if (error.code === "auth/email-already-in-use") {
      // Handle email already in use error
      throw new Error(
        "The email address is already in use by another account."
      );
    } else {
      throw error;
    }
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    throw new Error("Email or Password wrong");
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser, logoutUser };
