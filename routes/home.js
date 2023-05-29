const homeHandler = require("../controllers/home");

const home = {
  method: "GET",
  path: "/",
  handler: homeHandler,
  options: {
    auth: "firebase",
  },
};

const any = {
  method: "GET",
  path: "/{any*}",
  handler: (request, h) => {
    return h
      .response({
        message: "Oops! The page you are looking for was not found",
      })
      .code(404);
  },
};

module.exports = [home, any];
