'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/zone_name');

lab.experiment('zone name validation tests', () => {
  lab.test('example.com', (done) => {
    const result = Joi.validate('example.com', schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('træls.dk (punycode)', (done) => {
    const result = Joi.validate('xn--trls-woa.dk', schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('træls.dk (raw)', (done) => {
    const result = Joi.validate('træls.dk', schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    done();
  });

  lab.test('rhabarberbarbarabarbarbarenbartbarbierbierbar.com', (done) => {
    const result = Joi.validate('rhabarberbarbarabarbarbarenbartbarbierbierbar.com', schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('topgear.co.uk', (done) => {
    const result = Joi.validate('topgear.co.uk', schema);

    Code.expect(result.error).to.be.null();
    done();
  });
});
