# envc-assert

[![Build Status](http://img.shields.io/travis/wilmoore/node-envc-assert.svg)](https://travis-ci.org/wilmoore/node-envc-assert) [![NPM version](http://img.shields.io/npm/v/envc-assert.svg)](https://www.npmjs.org/package/envc-assert) [![NPM downloads](http://img.shields.io/npm/dm/envc-assert.svg)](https://www.npmjs.org/package/envc-assert) [![LICENSE](http://img.shields.io/npm/l/envc-assert.svg)](license)

> A drop-in replacement for `envc` that also verifies specific environment variables are set.
> When one or more keys are missing, a [ReferenceError] is thrown.

    $ npm install envc-assert --save

## API

    var envc = require('envc-assert');
    envc();

## Example

###### .env

    DB_HOST="someapp.5432.rds.amazonaws.com"
    DB_USER="someapp"

###### .env-required

    DB_HOST="localhost"
    DB_USER=""

###### .env.test

    TEST_DB_HOST="localhost"
    TEST_DB_USER=""

###### .env-required.test

    TEST_DB_HOST="localhost"
    TEST_DB_USER=""

## Acknowledgement

- [envc]
- [assert-env]

## License

  [MIT](license)

[assert-env]: https://www.npmjs.org/package/assert-env
[envc]: https://github.com/vesln/envc
[ReferenceError]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError
