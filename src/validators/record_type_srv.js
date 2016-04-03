'use strict';

const Hoek = require('hoek');
const Joi = require('joi');
const domainName = require('./domain_name');
const recordBase = require('./record_base');

module.exports = Hoek.clone(recordBase).keys({
  record_type: Joi.string().valid('SRV').required(),
  name: domainName.required(),
  port: Joi.number().integer().positive().max(65535).required(),
  priority: Joi.number().integer().positive().max(500).required()
});
