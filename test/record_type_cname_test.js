'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/record_type_cname');

lab.experiment('CNAME record type tests', () => {
  lab.test('valid CNAME record', (done) => {
    const record = {
      "id": 42,
      "prefix": "www",
      "zone_name": "example.com",
      "record_type": "CNAME",
      "ttl": 43200,
      "name": "example.com"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('valid CNAME record with name xn--e1afmkfd.xn--80akhbyknj4f', (done) => {
    const record = {
      "id": 42,
      "prefix": "xn--e1afmkfd",
      "zone_name": "example.com",
      "record_type": "CNAME",
      "ttl": 43200,
      // Cyrillic script domain name.
      "name": "xn--e1afmkfd.xn--80akhbyknj4f"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.null();
    done();
  });


  lab.test('CNAME record with invalid type', (done) => {
    const record = {
      "id": 42,
      "zone_name": "example.com",
      "record_type": "ALIAS",
      "ttl": 43200,
      "name": "example.net"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"record_type" must be one of [CNAME]');
    done();
  });

  lab.test('CNAME with invalid name -bjarne.dk', (done) => {
    const record = {
      "id": 42,
      "zone_name": "example.com",
      "record_type": "CNAME",
      "ttl": 43200,
      "name": "-bjarne.dk"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.match(/^"name" with value.+fails to match the required pattern/);
    done();
  });

  lab.test('CNAME with invalid name bjarne-.dk', (done) => {
    const record = {
      "id": 42,
      "zone_name": "example.com",
      "record_type": "CNAME",
      "ttl": 43200,
      "name": "-bjarne.dk"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.match(/^"name" with value.+fails to match the required pattern/);
    done();
  });
});
