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
    return h.response({
      message: "Page Not Found",
    });
  },
};

module.exports = [home, any];
