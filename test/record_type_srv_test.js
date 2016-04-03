'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/record_type_srv');

lab.experiment('SRV record tests', () => {
  lab.test('valid SRV record', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SRV",
      "ttl": 43200,
      "name": "smtp.example.com",
      "port": 587,
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('SRV record with negative port', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SRV",
      "ttl": 43200,
      "name": "smtp.example.com",
      "port": -587,
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"port" must be a positive number');
    done();
  });

  lab.test('SRV record with port over 65535', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SRV",
      "ttl": 43200,
      "name": "smtp.example.com",
      "port": 72000,
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"port" must be less than or equal to 65535');
    done();
  });

  lab.test('SRV record with missing name', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SRV",
      "ttl": 43200,
      "port": 587,
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"name" is required');
    done();
  });

  lab.test('SRV record with missing port', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SRV",
      "ttl": 43200,
      "name": "smtp.example.com",
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"port" is required');
    done();
  });

  lab.test('SRV record with invalid type', (done) => {
    const record = {
      "prefix": "_submission._tcp",
      "zone_name": "example.com",
      "record_type": "SAV",
      "ttl": 43200,
      "name": "smtp.example.com",
      "port": 10,
      "priority": 10
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"record_type" must be one of [SRV]');
    done();
  });
});
