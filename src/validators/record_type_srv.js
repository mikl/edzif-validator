'use strict'

const Joi = require('joi')
const domainName = require('./domain_name')
const recordBase = require('./record_base')

module.exports = recordBase.keys({
  record_type: Joi.string().valid('SRV').required(),
  name: domainName.required(),
  port: Joi.number().integer().positive().max(65535).required(),
  priority: Joi.number().integer().min(0).max(500).required(),
  weight: Joi.number().integer().min(0).max(500).required()
})
