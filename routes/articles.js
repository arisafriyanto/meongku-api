const Boom = require("@hapi/boom");
const { getAllArticle, getArticleById } = require("../controllers/articles");

const articleGetAllRoute = {
  method: "GET",
  path: "/articles",
  handler: async (request, h) => {
    try {
      const articles = await getAllArticle();

      if (articles) {
        return h.response({
          status: "success",
          message: "Semua artikel tersedia",
          articles: articles,
        });
      } else {
        return Boom.notFound("Artikel tidak ditemukan");
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
        return h.response({
          status: "success",
          message: "Artikel ditemukan",
          article: article,
        });
      } else {
        return Boom.notFound("Article Not Found");
      }
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
  options: {
    auth: "firebase",
  },
};

module.exports = [articleGetAllRoute, articleDetailRoute];
