'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/record_type_txt');

lab.experiment('record type TXT tests', () => {
  lab.test('valid TXT record', (done) => {
    const record = {
      "id": 42,
      "zone_name": "example.com",
      "record_type": "TXT",
      "ttl": 43200,
      "text_content": "v=spf1 mx -all"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('TXT record with invalid type', (done) => {
    const record = {
      "id": 42,
      "zone_name": "example.com",
      "record_type": "TEXT",
      "ttl": 43200,
      "text_content": "v=spf1 mx -all"
    };

    const result = Joi.validate(record, schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.startWith('"record_type" must be one of [TXT]');
    done();
  });
});
