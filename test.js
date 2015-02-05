'use strict';

/*!
 * imports.
 */

var test = require('tape');
var envc = require('./');

/*!
 * helpers.
 */

function generate(options) {
  return function () {
    envc(options);
  };
}

/*!
 * cases.
 */

test('throws when missing keys', function (t) {
  t.plan(1);

  var fn = generate({
    path: 'test/scenarios/missing-required-keys',
    name: 'env'
  });

  t.throws(fn, ReferenceError, /VERSION/);
});

test('supports default envc loading behavior', function (t) {
  t.plan(1);

  var parsed = envc({
    path: 'test/scenarios/default',
    name: 'env'
  });

  t.true('SCENARIO' in parsed);
});

test('throws when missing inherited keys', function (t) {
  t.plan(1);

  var env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'demo';

  var fn = generate({
    path: 'test/scenarios/missing-required-inherited-keys',
    name: 'env'
  });

  t.throws(fn, ReferenceError, /VERSION/);

  process.env.NODE_ENV = env;
});

test('no error thrown with empty inherited keys file', function (t) {
  t.plan(1);

  var env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'demo';

  var parsed = envc({
    path: 'test/scenarios/missing-required-inherited-keys-empty',
    name: 'env'
  });

  t.deepEqual(Object.keys(parsed), ['SCENARIO']);

  process.env.NODE_ENV = env;
});

test('no error thrown with matching inherited keys file', function (t) {
  t.plan(1);

  var env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'demo';

  var parsed = envc({
    path: 'test/scenarios/inherited-keys',
    name: 'env'
  });

  t.deepEqual(Object.keys(parsed), ['DB_HOST', 'DB_USER', 'DEMO_DB_HOST', 'DEMO_DB_USER']);

  process.env.NODE_ENV = env;
});
