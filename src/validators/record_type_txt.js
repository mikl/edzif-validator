'use strict'

const Joi = require('joi')
const recordBase = require('./record_base')

module.exports = recordBase.keys({
  record_type: Joi.string().valid('TXT').required(),
  // Allowed in TXT records are ASCII letters, plus a selected set of
  // symbols, which translates to this gobbledygook you see in the regex
  // below. The \[\\\]\ sequence just whitelists the characters [\], but
  // since they all need escaping in regex, it becomes a bit strange.
  text_content: Joi.string().required().regex(/^[A-Za-z0-9 !"#\$%&'()*+,-.\/:;<=>?@\[\\\]\^_`{\|}~-]+$/)
})
