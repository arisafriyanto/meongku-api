const homeHandler = (request, h) => {
  return h
    .response({
      statusCode: "200",
      message: "Hello Bangkit Academy",
    })
    .code(200);
};

module.exports = homeHandler;
