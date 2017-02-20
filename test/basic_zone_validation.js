'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { Zone: validate } = require('..')

lab.experiment('basic zone with default options', () => {
  lab.test('simplest use case', () => {
    const zone = require('./fixtures/zone_basic')

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean()
      Code.expect(result.valid).to.be.true()
    })
  })

  lab.test('new GTLD zone name', () => {
    const zone = require('./fixtures/zone_basic_new_gtld')

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean()
      Code.expect(result.valid).to.be.true()
    })
  })

  lab.test('zone without name property', () => {
    const zone = require('./fixtures/zone_no_name')

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean()
      Code.expect(result.valid).to.be.false()
      Code.expect(result.errors).to.be.an.object()
      Code.expect(result.errors.zone).to.be.an.object()
      Code.expect(result.errors.zone.details[0].message).to.be.a.string()
      Code.expect(result.errors.zone.details[0].message).to.equal('"name" is required')
    })
  })

  lab.test('zone with extraneous property', () => {
    const zone = require('./fixtures/zone_extra_prop')

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean()
      Code.expect(result.valid).to.be.false()
      Code.expect(result.errors).to.be.an.object()
      Code.expect(result.errors.zone.details[0].message).to.be.a.string()
      Code.expect(result.errors.zone.details[0].message).to.equal('"extra_prop" is not allowed')
    })
  })

  lab.test('zone with all allowed properties', () => {
    const zone = require('./fixtures/zone_allowed_props')

    return validate(zone).then((result) => {
      Code.expect(result.valid).to.be.a.boolean()
      Code.expect(result.valid).to.be.true()
    })
  })
})
