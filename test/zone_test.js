'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const validate = require('..');

lab.experiment('zone validation tests (example.com)', () => {
  lab.test('valid zone', (done) => {
    const zone = require('./fixtures/zone_full_valid');

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.true();
    });
  });
});
