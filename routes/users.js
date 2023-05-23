const Boom = require("@hapi/boom");
const { getUserData, editProfile } = require("./../controllers/users");
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
    const { name, email, password, phone, currentEmail, currentPassword } =
      request.payload;

    try {
      const result = await editProfile(
        uid,
        name,
        email,
        password,
        phone,
        currentEmail,
        currentPassword
      );

      if (result) {
        return h
          .response({
            status: "success",
            message: "Profile update successfully",
          })
          .code(200);
      } else {
        return Boom.forbidden("User not authorized to edit this profile");
      }
    } catch (error) {
      return Boom.badRequest("Error updating profile");
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional(),
        phone: Joi.string().min(8).optional(),
        currentEmail: Joi.string().email().required(),
        currentPassword: Joi.string().required(),
      }),
      params: Joi.object({
        uid: Joi.string().required(),
      }),
    },
  },
};

const editPasswordRoute = {
  method: "PUT",
  path: "/users/{uid}/edit-password",
  handler: async (request, h) => {
  const {uid} = request.params;
  const {user_uid, email} = request.auth.credentials;
    try {
      const user = await editPassword(email, currentPassword, newPassword);
      console.log(request.auth)
      return h.response({
        status: "success",
        message: "Edit password berhasil"
      }).code(200)
    } catch (error) {
      return Boom.badRequest("Error edit password");
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        currentPassword: Joi.string().min(8).required(),
        newPassword: Joi.string().min(8).required(),
      }),
      params: Joi.object({
        uid: Joi.string().required(),
      })
    },
  },
};

module.exports = [userDetailRoute, editProfileRoute, editPasswordRoute];
