'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const validate = require('..');

lab.experiment('basic zone with default options', () => {
  lab.test('simplest use case', (done) => {
    const zone = require('./fixtures/zone_basic');

    validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.true();
      done();
    });
  });

  lab.test('new GTLD zone name', (done) => {
    const zone = require('./fixtures/zone_basic_new_gtld');

    validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.true();
      done();
    });
  });

  lab.test('zone without name property', (done) => {
    const zone = require('./fixtures/zone_no_name');

    validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.false();
      Code.expect(result.errors).to.be.an.object();
      done();
    });
  });
});
