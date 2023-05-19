const homeHandler = require("../controllers/home");

const home = {
  method: "GET",
  path: "/",
  handler: homeHandler,
  options: {
    auth: "firebase",
  },
};

module.exports = home;
