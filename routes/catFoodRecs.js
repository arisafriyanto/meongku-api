const Boom = require("@hapi/boom");
const Joi = require("joi");
const addCatFoodRecs = require("../controllers/catFoodRecs");

const catFoodRecsRoute = {
  method: "POST",
  path: "/cat-food-recommendations",
  handler: async (request, h) => {
    const { nameInput, foodTypeInput, ageInput, activityInput, raceInput } =
      request.payload;

    try {
      const catFoodRec = await addCatFoodRecs(
        nameInput,
        foodTypeInput,
        ageInput,
        activityInput,
        raceInput
      );

      if (catFoodRec.length !== 0) {
        return h.response({
          status: "success",
          message: "data cat food recommendations",
          data: catFoodRec[0],
        });
      } else {
        return Boom.badRequest("Cat food tidak tersedia");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        nameInput: Joi.string().required(),
        foodTypeInput: Joi.string().required(),
        ageInput: Joi.number().required(),
        activityInput: Joi.string().required(),
        raceInput: Joi.string().required(),
      }),
    },
    auth: "firebase",
  },
};

module.exports = catFoodRecsRoute;
