const Joi = require("joi");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("./../controllers/auth");
const Boom = require("@hapi/boom");
const admin = require("./../config/firebase-admin");

const registerRoute = {
  method: "POST",
  path: "/v1/register",
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
  path: "/v1/login",
  handler: async (request, h) => {
    try {
      const { email, password } = request.payload;

      const userCredential = await loginUser(email, password);
      const idToken = userCredential._tokenResponse.idToken;
      
      const expiresIn = 60 * 60 * 24 * 7 * 1000; // Durasi cookie (dalam detik), misalnya 7 hari
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

      const response = h.response({ 
        statusCode: 200,
        status: "Success",
        message: "Login successfully",
        data: {
          uid: userCredential.user.uid,
          sessionId: sessionCookie
        }
      }).code(200);

      return response;
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
  path: "/v1/logout",
  handler: async (request, h) => {
    const { user_uid } = request.auth.credentials;

    try {
      await logoutUser();
      await admin.auth().revokeRefreshTokens(user_uid);

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
