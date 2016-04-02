'use strict';

const Hoek = require('hoek');
const Joi = require('joi');
const recordBase = require('./record_base');

module.exports = Hoek.clone(recordBase).keys({
  record_type: Joi.string().valid('a').insensitive().required(),
  address: Joi.string().ip({
    cidr: 'forbidden',
    version: [ 'ipv4' ]
  }).required()
});
