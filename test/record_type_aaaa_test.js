'use strict'

const Code = require('code')
const Joi = require('joi')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const schema = require('../src/validators/record_type_aaaa')

lab.experiment('record type AAAA tests', () => {
  lab.test('valid AAAA record', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'AAAA',
      'ttl': 43200,
      'address': 'fdda:5cc1:23:4::1f'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.null()
    done()
  })

  lab.test('A record with invalid IP address', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'AAAA',
      'ttl': 43200,
      'address': '192.168.42'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"address" must be a valid ip address')
    done()
  })

  lab.test('A record with IP address with CIDR', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'AAAA',
      'ttl': 43200,
      'address': 'beef:dead::0/16'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.startWith('"address" must be a valid ip address')
    done()
  })

  lab.test('A record with invalid type', (done) => {
    const record = {
      'id': 42,
      'zone_name': 'example.com',
      'record_type': 'B',
      'ttl': 43200,
      'address': 'beef:dead::1'
    }

    const result = Joi.validate(record, schema)

    Code.expect(result.error).to.be.an.object()
    Code.expect(result.error.details).to.be.an.array()
    Code.expect(result.error.details).to.have.length(1)
    Code.expect(result.error.details[0].message).to.be.a.string()
    Code.expect(result.error.details[0].message).to.equal('"record_type" must be one of [AAAA]')
    done()
  })
})
