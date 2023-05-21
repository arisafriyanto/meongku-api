const homeHandler = (request, h) => {
  const { user_uid } = request.auth.credentials;
  return h
    .response({
      statusCode: "200",
      message: "Hello Bangkit Academy",
      data: {
        uid: user_uid,
      },
    })
    .code(200);
};

module.exports = homeHandler;
