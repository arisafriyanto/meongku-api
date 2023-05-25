const Boom = require("@hapi/boom");
const { getAllArticle, getArticleById } = require("../controllers/articles");
const Joi = require("joi");

const articleGetAllRoute = {
  method: "GET",
  path: "/articles",
  handler: async (request, h) => {
    try {
      const articles = await getAllArticle();

      if (articles.length !== 0) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "All articles are available",
            articles: articles,
          })
          .code(200);
      } else {
        return Boom.notFound("Article not found");
      }
    } catch (error) {
      return Boom.notFound(error.message);
    }
  },
  options: {
    auth: "firebase",
  },
};

const articleDetailRoute = {
  method: "GET",
  path: "/articles/{id}",
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const article = await getArticleById(id);

      if (article) {
        return h
          .response({
            statusCode: 200,
            status: "Success",
            message: "Article found successfully",
            article: article,
          })
          .code(200);
      } else {
        return Boom.notFound("Article not found");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    auth: "firebase",
  },
};

module.exports = [articleGetAllRoute, articleDetailRoute];
