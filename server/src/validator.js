const { check, validationResult } = require("express-validator");

const createUrlValidator = [
  check("url").isURL().withMessage("URL is required !!"),
];

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0)
    return res
      .status(401)
      .json({ status: 401, message: errors.array()[0].msg });

  next();
};

module.exports = { createUrlValidator, isRequestValidated };
