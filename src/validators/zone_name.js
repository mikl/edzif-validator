'use strict'

const Joi = require('joi')

module.exports = Joi.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9\.-]*\.[a-zA-Z]{2,}$/)
