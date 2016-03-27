'use strict';

const Joi = require('joi');
const zoneName = require('./zone_name');

const schema = Joi.object().keys({
  name: zoneName.required()
});

module.exports = function (zone, config) {
  return new Promise((resolve, reject) => {
    const response = {
      errors: {}
    };

    Joi.validate(zone, schema, (err, value) => {
      response.valid = !err;

      // Expose the error objects to the caller.
      if (err) {
        response.errors.zone = err;
      }

      resolve(response);
    });
  });
};
