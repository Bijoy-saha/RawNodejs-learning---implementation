//dependencies
const { samplehandler } = require("./handlers/routehandler/sample");
const { userHandler } = require("./handlers/routehandler/userhandler");
const { tokenHandler } = require("./handlers/routehandler/tokenhandler");
const { checkHandler } = require("./handlers/routehandler/checkhandler");
const routes = {
  sample: samplehandler,
  user: userHandler,
  tokenHandler: tokenHandler,
  check: checkHandler,
};
module.exports = routes;
