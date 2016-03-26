'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const validator = require('..');

lab.experiment('basic zone with default options', () => {
  lab.test('simplest use case', (done) => {
    const basic_zone = require('./fixtures/basic_zone')

    const result = validator(basic_zone);

    Code.expect(result.valid).to.be.a.boolean();
    Code.expect(result.valid).to.be.true();
    done();
  });
});
