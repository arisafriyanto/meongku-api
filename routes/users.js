const Boom = require("@hapi/boom");
const {
  getUserData,
  editProfile,
  editPassword,
} = require("./../controllers/users");
const Joi = require("joi");

const userDetailRoute = {
  method: "GET",
  path: "/users/{uid}",
  handler: async (request, h) => {
    const { user_uid } = request.auth.credentials;
    const { uid } = request.params;

    try {
      if (user_uid !== uid) {
        return Boom.badRequest("Invalid id token for user");
      }

      const data = await getUserData(uid);

      if (data) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "User found successfully",
            user: {
              name: data.name,
              email: data.email,
              phone: data.phone,
            },
          })
          .code(200);
      } else {
        return Boom.notFound("User not found");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      params: Joi.object({
        uid: Joi.string().required(),
      }),
    },
    auth: "firebase",
  },
};

const editProfileRoute = {
  method: "PUT",
  path: "/users/{uid}",
  handler: async (request, h) => {
    const { uid } = request.params;
    const { name, phone } = request.payload;

    try {
      const result = await editProfile(uid, name, phone);

      if (result) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "Edit user profile successfully",
          })
          .code(200);
      } else {
        return Boom.badRequest("Edit user profile fail");
      }
    } catch (error) {
      return Boom.badRequest("Error updating profile");
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).optional(),
        phone: Joi.string().min(8).optional(),
      }),
      params: Joi.object({
        uid: Joi.string().required(),
      }),
    },
    auth: "firebase",
  },
};

const editPasswordRoute = {
  method: "PUT",
  path: "/users/{uid}/edit-password",
  handler: async (request, h) => {
    const { uid } = request.params;
    const { email } = request.auth.credentials;
    const { currentPassword, password } = request.payload;
    try {
      const result = await editPassword(uid, email, currentPassword, password);

      if (result) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "Edit user password successfully",
          })
          .code(200);
      } else {
        return Boom.unauthorized("User not authorized");
      }
    } catch (error) {
      return Boom.badRequest("Error updating password");
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        currentPassword: Joi.string().min(8).required(),
        password: Joi.string().min(8).required(),
      }),
      params: Joi.object({
        uid: Joi.string().required(),
      }),
    },
    auth: "firebase",
  },
};

module.exports = [userDetailRoute, editProfileRoute, editPasswordRoute];
