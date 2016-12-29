'use strict'

const Joi = require('joi')
const recordBase = require('./record_base')

module.exports = recordBase.keys({
  record_type: Joi.string().valid('AAAA').required(),
  address: Joi.string().ip({
    cidr: 'forbidden',
    version: [ 'ipv6' ]
  }).required()
})
