'use strict'

const Joi = require('joi')
const RecordTypeA = require('./record_type_a')
const RecordTypeAAAA = require('./record_type_aaaa')
const RecordTypeCNAME = require('./record_type_cname')
const RecordTypeMX = require('./record_type_mx')
const RecordTypeNS = require('./record_type_ns')
const RecordTypeSOA = require('./record_type_soa')
const RecordTypeSRV = require('./record_type_srv')
const RecordTypeTXT = require('./record_type_txt')
const zoneName = require('./zone_name')

const schema = Joi.object().keys({
  // Implementation specific, any kind of ID is allowed.
  id: Joi.any(),
  name: zoneName.required(),
  records: Joi.array().items(
    RecordTypeA, RecordTypeAAAA, RecordTypeCNAME, RecordTypeMX, RecordTypeNS,
    RecordTypeSOA, RecordTypeSRV, RecordTypeTXT
  ),
  vendor: Joi.object()
})

module.exports = function (zone, config) {
  return new Promise((resolve) => {
    const response = {
      errors: {}
    }

    const result = Joi.validate(zone, schema, { abortEarly: false })

    response.valid = !result.error
    // Expose the error objects to the caller.
    if (result.error) {
      response.errors.zone = result.error
    }

    resolve(response)
  })
}
