'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const validator = require('..');

lab.experiment('basic zone with default options', () => {
  lab.test('simplest use case', (done) => {
    const zone = require('./fixtures/zone_basic');

    const result = validator(zone);

    Code.expect(result.valid).to.be.a.boolean();
    Code.expect(result.valid).to.be.true();
    done();
  });

  lab.test('new GTLD zone name', (done) => {
    const zone = require('./fixtures/zone_basic_new_gtld');

    const result = validator(zone);

    Code.expect(result.valid).to.be.a.boolean();
    Code.expect(result.valid).to.be.true();
    done();
  });
});
