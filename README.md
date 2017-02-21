EDZIF validator
===============

[![Circle CI](https://circleci.com/gh/mikl/edzif-validator.svg?style=svg)](https://circleci.com/gh/mikl/edzif-validator)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/mikl/edzif-validator/badges/gpa.svg)](https://codeclimate.com/github/mikl/edzif-validator)

Library to validate DNS zones in EDZIF format.

### Example usage

To validate a zone (ES6 syntax, Node.js):

    const { Zone } = require('edzif-validator');

    Zone(zoneData).then((result) => {
        // Check result.valid to see if we got a valid response.
        // Check result.errors to see any errors returned.
    });

### Development

To run the test suite whenever the code changes, run:

    npm run dev

