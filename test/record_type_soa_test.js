'use strict'

const Code = require('code')
const Joi = require('joi')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const schema = require('../src/validators/record_type_soa')

lab.experiment('SOA record tests', () => {
  lab.test('valid SOA record', (done) => {
    const record = {
      'name': 'example.com',
      'record_type': 'SOA',
      'ttl': 43200,
      'primary_server': 'ns1.example.com',
      'responsible_person': 'zonemaster.example.com',
      'serial': 2016062942,
      'refresh': 10,
      'retry': 10,
      'expire': 10,
      'minimum_ttl': 10
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.null()
    done()
  })

  lab.test('SOA record with negative TTL', (done) => {
    const record = {
      'name': 'example.com',
      'record_type': 'SOA',
      'ttl': -4,
      'primary_server': 'ns1.example.com',
      'responsible_person': 'zonemaster.example.com',
      'serial': 2016062942,
      'refresh': 10,
      'retry': 10,
      'expire': 10,
      'minimum_ttl': 10
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"ttl" must be a positive number')
    done()
  })

  lab.test('SOA record with missing name', (done) => {
    const record = {
      'record_type': 'SOA',
      'ttl': -4,
      'primary_server': 'ns1.example.com',
      'responsible_person': 'zonemaster.example.com',
      'serial': 2016062942,
      'refresh': 10,
      'retry': 10,
      'expire': 10,
      'minimum_ttl': 10
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"name" is required')
    done()
  })
})
