const homeHandler = (request, h) => {
  const { verifyUid } = request.auth.credentials;
  return h
    .response({
      statusCode: "200",
      message: "Hello Bangkit Academy",
      data: {
        uid: verifyUid,
      },
    })
    .code(200);
};

module.exports = homeHandler;
