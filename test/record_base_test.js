'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/record_base');

lab.experiment('record base tests', () => {
  lab.test('valid base record', (done) => {
    const record = require('./fixtures/record_base_valid');

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('base record with invalid TTL', (done) => {
    const record = require('./fixtures/record_base_ttl_invalid');

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.equal('"ttl" must be a positive number');
    done();
  });
});
