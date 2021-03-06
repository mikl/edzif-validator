'use strict'

const Joi = require('joi')
const domainName = require('./domain_name')
const recordBase = require('./record_base')

module.exports = recordBase.keys({
  record_type: Joi.string().valid('MX').required(),
  name: domainName.required().allow('@'),
  priority: Joi.number().integer().positive().max(500).required()
})
