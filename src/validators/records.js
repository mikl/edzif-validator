'use strict'

const Joi = require('joi')

const validators = {
  A: require('./record_type_a'),
  AAAA: require('./record_type_aaaa'),
  CNAME: require('./record_type_cname'),
  MX: require('./record_type_mx'),
  NS: require('./record_type_ns'),
  SOA: require('./record_type_soa'),
  SRV: require('./record_type_srv'),
  TXT: require('./record_type_txt')
}

const compiledValidators = {}

/**
 * Validate multiple records.
 *
 * @param {array} records
 *
 * @return {array} Validation errors, using the same keys as the records.
 */
function validateRecords (records) {
  const results = []

  for (let record of records) {
    if (validators[record.record_type]) {
      let result = Joi.validate(record, validators[record.record_type], { abortEarly: false })

      if (result.error) {
        results.push(result)
      }
    }
    else {
      throw new Error('EDZIFVALDERR-001: No validator found for record type ' + record.record_type)
    }
  }

  return results
}

module.exports = validateRecords
