'use strict';

const Hoek = require('hoek');
const Joi = require('joi');
const domainName = require('./domain_name');
const recordBase = require('./record_base');

module.exports = Hoek.clone(recordBase).keys({
  record_type: Joi.string().valid('CNAME').required(),
  name: domainName.required()
});
