const cors = require("cors");

module.exports = function (app) {
  app.use(cors());
};
//Getting access to CORS , x-token-header and all
