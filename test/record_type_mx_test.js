'use strict'

const Code = require('code')
const Joi = require('joi')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const schema = require('../src/validators/record_type_mx')

lab.experiment('MX record tests', () => {
  lab.test('valid MX record', (done) => {
    const record = {
      'zone_name': 'example.com',
      'record_type': 'MX',
      'ttl': 43200,
      'name': 'smtp.example.com',
      'priority': 10
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.null()
    done()
  })

  lab.test('MX record with invalid priority', (done) => {
    const record = {
      'zone_name': 'example.com',
      'record_type': 'MX',
      'ttl': 43200,
      'name': 'smtp.example.com',
      'priority': -1
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"priority" must be a positive number')
    done()
  })

  lab.test('MX record with missing name', (done) => {
    const record = {
      'zone_name': 'example.com',
      'record_type': 'MX',
      'ttl': 43200,
      'priority': 100
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"name" is required')
    done()
  })

  lab.test('MX record with missing priority', (done) => {
    const record = {
      'zone_name': 'example.com',
      'record_type': 'MX',
      'ttl': 43200,
      'name': 'smtp.example.com'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"priority" is required')
    done()
  })

  lab.test('MX record with invalid type', (done) => {
    const record = {
      'zone_name': 'example.com',
      'record_type': 'MAX',
      'ttl': 43200,
      'name': 'smtp.example.com',
      'priority': 10
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"record_type" must be one of [MX]')
    done()
  })
})
