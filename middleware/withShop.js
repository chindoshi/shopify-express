const {TEST_COOKIE_NAME, TOP_LEVEL_OAUTH_COOKIE_NAME} = require('../constants');

module.exports = function withShop({ authBaseUrl } = {}) {
  return function verifyRequest(request, response, next) {
    const { query: { shop }, session, baseUrl } = request;

    if (session && session.accessToken) {
      response.clearCookie(TOP_LEVEL_OAUTH_COOKIE_NAME, {  secure: true, sameSite: "none" });
      next();
      return;
    }

    response.cookie(TEST_COOKIE_NAME, '1', {  secure: true, sameSite: "none" });

    if (shop) {
      response.redirect(`${authBaseUrl || baseUrl}/auth?shop=${shop}`);
      return;
    }

    response.redirect('/install');
    return;
  };
};
