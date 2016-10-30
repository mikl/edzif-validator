'use strict'

const Joi = require('joi')
const domainName = require('./domain_name')

// @see https://blog.bobcares.com/understanding-soa-records/
// @see http://rscott.org/dns/soa.html

module.exports = Joi.object({
  name: domainName.required(),
  record_type: Joi.string().valid('SOA').required(),
  ttl: Joi.number().integer().positive(),
  primary_server: domainName.required(),
  responsible_person: domainName.required(),
  serial: Joi.number().integer().positive().required(),
  refresh: Joi.number().integer().positive().required(),
  retry: Joi.number().integer().positive().required(),
  expire: Joi.number().integer().positive().required(),
  minimum_ttl: Joi.number().integer().positive().required()
})
