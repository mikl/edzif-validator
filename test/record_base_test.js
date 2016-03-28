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
});
