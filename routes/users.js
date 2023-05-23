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
        return Boom.badRequest("Token not valid to user");
      }

      const data = await getUserData(uid);

      if (data) {
        return h
          .response({
            status: "success",
            message: "User data found",
            data: {
              name: data.name,
              email: data.email,
            },
          })
          .code(200);
      } else {
        return Boom.notFound("No user data found");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
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
            status: "success",
            message: "Profile update successfully",
          })
          .code(200);
      } else {
        return Boom.badRequest("Error updating profile");
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
            status: "success",
            message: "Edit password berhasil",
          })
          .code(200);
      } else {
        return Boom.badRequest("User not authorize");
      }
    } catch (error) {
      return Boom.badRequest("Error edit password");
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
