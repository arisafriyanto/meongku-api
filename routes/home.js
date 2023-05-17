const homeHandler = require("../controllers/home");

const home = {
  method: "GET",
  path: "/",
  handler: homeHandler,
};

module.exports = home;
