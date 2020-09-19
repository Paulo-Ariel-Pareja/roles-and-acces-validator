const schema = require('../schemas/body-schema');
const Joi = require('@hapi/joi');

module.exports.validateBodyContentMiddleware = async (req, res, next) => {
  let result;
  try {
    await Joi.validate(req.body, schema);
    return next();
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};
