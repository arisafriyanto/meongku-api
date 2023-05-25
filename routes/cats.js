const Boom = require("@hapi/boom");
const Joi = require("joi");
const {
  addCatFoodRecs,
  getAllCat,
  getCatById,
} = require("../controllers/cats");

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
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "Cat food product recommendations available",
            data: catFoodRec[0],
          })
          .code(200);
      } else {
        return Boom.notFound("Cat food product recommendations not available");
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

const catsRoute = {
  method: "GET",
  path: "/cats",
  handler: async (request, h) => {
    try {
      const cats = await getAllCat();

      if (cats.length !== 0) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "All Cat data is available",
            cats: cats,
          })
          .code(200);
      } else {
        return Boom.notFound("All Cat data not available");
      }
    } catch (error) {
      return Boom.notFound("All Cat data not available");
    }
  },
  options: {
    auth: "firebase",
  },
};

const catByIdRoute = {
  method: "GET",
  path: "/cats/{id}",
  handler: async (request, h) => {
    const id = request.params.id;

    try {
      const cat = await getCatById(id);

      if (cat.length !== 0) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "Cat data is available",
            cat: cat,
          })
          .code(200);
      } else {
        return Boom.notFound("Cat data is not available");
      }
    } catch (error) {
      return Boom.notFound("Cat data is not available");
    }
  },
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    auth: "firebase",
  },
};

module.exports = [catFoodRecsRoute, catsRoute, catByIdRoute];
