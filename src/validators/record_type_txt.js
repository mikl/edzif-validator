'use strict';

const Hoek = require('hoek');
const Joi = require('joi');
const recordBase = require('./record_base');

module.exports = Hoek.clone(recordBase).keys({
  record_type: Joi.string().valid('TXT').required(),
  text_content: Joi.string().required()
});
