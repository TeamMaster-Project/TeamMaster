const config = require("config");
module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if (!config.get("enableAuth")) return next(); //Check the config file whether "enableAuth" is enabled or disabled(enableAuth: true OR false)

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
