'use strict'

const Joi = require('joi')
const recordBase = require('./record_base')

module.exports = recordBase.keys({
  record_type: Joi.string().valid('A').required(),
  address: Joi.string().ip({
    cidr: 'forbidden',
    version: [ 'ipv4' ]
  }).required()
})
