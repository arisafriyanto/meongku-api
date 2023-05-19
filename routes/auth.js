const Joi = require("joi");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("./../controllers/auth");
const Boom = require("@hapi/boom");

const register = {
  method: "POST",
  path: "/register",
  handler: async (request, h) => {
    const { name, email, password } = request.payload;
    try {
      const user = await registerUser(name, email, password);
      const idToken = user._tokenResponse.idToken;
      console.log(idToken);
      return h
        .response({
          status: "success",
          message: "User registered",
          uid: user.user.uid,
          idToken: idToken,
        })
        .code(201);
    } catch (error) {
      // console.log("Error registering user", error);
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },
  },
};

const loginRoute = {
  method: "POST",
  path: "/login",
  handler: async (request, h) => {
    try {
      const { email, password } = request.payload;

      const userCredential = await loginUser(email, password);
      const idToken = userCredential._tokenResponse.idToken;

      return h
        .response({
          status: "success",
          message: "Login success",
          uid: userCredential.user.uid,
          idToken: idToken,
        })
        .code(200);
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },
  },
};

const logoutRoute = {
  method: "POST",
  path: "/logout",
  handler: async (request, h) => {
    try {
      await logoutUser();

      return h.response({
        status: "success",
        message: "User logged out successfully",
      });
    } catch (error) {
      return Boom.badRequest("Error logging out user");
    }
  },
};

module.exports = [register, loginRoute, logoutRoute];
