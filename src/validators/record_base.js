'use strict';

const Joi = require('joi');
const zoneName = require('./zone_name');

module.exports = Joi.object({
  // Implementation specific, any kind of ID is allowed.
  id: Joi.any(),
  prefix: Joi.string(),
  zone_name: zoneName,
  record_type: Joi.string(),
  ttl: Joi.number().integer().positive()
});
