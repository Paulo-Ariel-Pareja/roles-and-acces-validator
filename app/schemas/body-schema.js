const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  path: Joi.string().required(),
  method: Joi.string().required(),
  role: Joi.array().items(Joi.string()).default([]),
  access: Joi.array().items(Joi.string()).default([])
});

module.exports = schema;
