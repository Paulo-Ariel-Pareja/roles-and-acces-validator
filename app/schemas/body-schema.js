const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  role: Joi.array().items(Joi.string()).required(),
  access: Joi.array().items(Joi.string()).required(),
  hostname: Joi.string().required()
});

module.exports = schema;
