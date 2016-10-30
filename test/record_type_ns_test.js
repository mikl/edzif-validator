'use strict'

const Code = require('code')
const Joi = require('joi')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const schema = require('../src/validators/record_type_ns')

lab.experiment('NS record type tests', () => {
  lab.test('valid NS record', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'NS',
      'ttl': 43200,
      'name': 'ns1.example.com'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.null()
    done()
  })

  lab.test('valid NS record with name xn--e1afmkfd.xn--80akhbyknj4f', (done) => {
    const record = {
      'id': 42,
      'prefix': 'xn--e1afmkfd',
      'zone_name': 'example.com',
      'record_type': 'NS',
      'ttl': 43200,
      // Cyrillic script domain name.
      'name': 'xn--e1afmkfd.xn--80akhbyknj4f'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.null()
    done()
  })

  lab.test('NS record with invalid type', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'ALIAS',
      'ttl': 43200,
      'name': 'example.net'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"record_type" must be one of [NS]')
    done()
  })

  lab.test('NS with invalid name -bjarne.dk', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'NS',
      'ttl': 43200,
      'name': '-bjarne.dk'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.match(/^"name" with value.+fails to match the required pattern/)
    done()
  })

  lab.test('NS with invalid name bjarne-.dk', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'NS',
      'ttl': 43200,
      'name': '-bjarne.dk'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.match(/^"name" with value.+fails to match the required pattern/)
    done()
  })
})
