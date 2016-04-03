'use strict';

const Code = require('code');
const Joi = require('joi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const schema = require('../src/validators/domain_name');

lab.experiment('domain name validation tests', () => {
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

  lab.test('xn--fdbk5d8ap9b8a8d.xn--deba0ad', (done) => {
    const result = Joi.validate('xn--fdbk5d8ap9b8a8d.xn--deba0ad', schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('xn--e1afmkfd.xn--80akhbyknj4f', (done) => {
    const result = Joi.validate('xn--e1afmkfd.xn--80akhbyknj4f', schema);

    Code.expect(result.error).to.be.null();
    done();
  });

  lab.test('-bjarne.dk', (done) => {
    const result = Joi.validate('-bjarne.dk', schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.match(/^"value" with value.+fails to match the required pattern/);
    done();
  });

  lab.test('bjarne-.dk', (done) => {
    const result = Joi.validate('-bjarne.dk', schema);

    Code.expect(result.error).to.be.an.object();
    Code.expect(result.error.details).to.be.an.array();
    Code.expect(result.error.details).to.have.length(1);
    Code.expect(result.error.details[0].message).to.be.a.string();
    Code.expect(result.error.details[0].message).to.match(/^"value" with value.+fails to match the required pattern/);
    done();
  });
});
