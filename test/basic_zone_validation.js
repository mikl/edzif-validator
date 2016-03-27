'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const validate = require('..');

lab.experiment('basic zone with default options', () => {
  lab.test('simplest use case', () => {
    const zone = require('./fixtures/zone_basic');

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.true();
    });
  });

  lab.test('new GTLD zone name', () => {
    const zone = require('./fixtures/zone_basic_new_gtld');

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.true();
    });
  });

  lab.test('zone without name property', () => {
    const zone = require('./fixtures/zone_no_name');

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean();
      Code.expect(result.valid).to.be.false();
      Code.expect(result.errors).to.be.an.object();
      Code.expect(result.errors.zone).to.be.an.object();
      Code.expect(result.errors.zone.details[0].message).to.be.a.string();
      Code.expect(result.errors.zone.details[0].message).to.equal('"name" is required');
    });
  });
});
