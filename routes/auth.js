const Joi = require("joi");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("./../controllers/auth");
const Boom = require("@hapi/boom");

const registerRoute = {
  method: "POST",
  path: "/register",
  handler: async (request, h) => {
    const { name, email, password, phone } = request.payload;

    try {
      const user = await registerUser(name, email, password, phone);

      return h
        .response({
          statusCode: 201,
          status: "Success",
          message: "Register successfully",
        })
        .code(201);
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().min(8).required(),
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
          statusCode: 200,
          status: "Success",
          message: "Login successfully",
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
        statusCode: 200,
        status: "Success",
        message: "Logout successfully",
      });
    } catch (error) {
      return Boom.badRequest("Error logging out user");
    }
  },
  options: {
    auth: "firebase",
  },
};

module.exports = [registerRoute, loginRoute, logoutRoute];
