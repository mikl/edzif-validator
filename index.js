'use strict'

const RecordTypeA = require('./src/validators/record_type_a')
const RecordTypeAAAA = require('./src/validators/record_type_aaaa')
const RecordTypeCNAME = require('./src/validators/record_type_cname')
const RecordTypeMX = require('./src/validators/record_type_mx')
const RecordTypeNS = require('./src/validators/record_type_ns')
const RecordTypeSOA = require('./src/validators/record_type_soa')
const RecordTypeSRV = require('./src/validators/record_type_srv')
const RecordTypeTXT = require('./src/validators/record_type_txt')
const Zone = require('./src/validators/zone')

module.exports = {
  RecordTypeA,
  RecordTypeAAAA,
  RecordTypeCNAME,
  RecordTypeMX,
  RecordTypeNS,
  RecordTypeSOA,
  RecordTypeSRV,
  RecordTypeTXT,
  Zone
}
