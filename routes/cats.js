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

const catsRoute = {
  method: "GET",
  path: "/cats",
  handler: async (request, h) => {
    try {
      const cats = await getAllCat();

      if (cats.length !== 0) {
        return h.response({
          status: "success",
          message: "data kucing tersedia",
          cats: cats,
        });
      } else {
        return Boom.notFound("data kucing tidak tersedia");
      }
    } catch (error) {
      return Boom.notFound("data kucing tidak tersedia");
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
        return h.response({
          status: "success",
          message: "kucing tersedia",
          cat: cat,
        });
      } else {
        return Boom.notFound("kucing tidak tersedia");
      }
    } catch (error) {
      return Boom.notFound("kucing tidak tersedia");
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
