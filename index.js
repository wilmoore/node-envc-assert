'use strict';

/*!
 * imports.
 */

var assert = require('assert-env');
var debug = require('debug')('envc-assert');
var envc = require('envc');
var extend = require('params').extend;
var format = require('util').format;

/*!
 * exports.
 */

module.exports = assertion;

/**
 * Assert that the given keys are found.
 * @throws ReferenceError
 *
 * @param {Object} options
 * envc options.
 *
 * @return {Array}
 * parsed keys
 */

function assertion(options) {
  options = options || {};
  var parsed = envc(options);

  // required
  var vars = required(options);
  debug('vars', vars);
  assert(vars);

  // required (inherited)
  var inherited = required(options, format('.%s', process.env.NODE_ENV));
  debug('inherited', inherited);
  assert(inherited);

  return parsed;
}

/**
 * Parse required keys from `{name}-required` file.
 *
 * @param {Object} options
 * envc options.
 *
 * @return {Array}
 * parsed keys
 */

function required(options, env) {
  var envs = env || '';
  var name = format('%s-required%s', options.name || '.env', envs);
  var opts = extend({}, options, { name: name, readonly: true, nodeenv: '-' });
  return Object.keys(envc(opts) || {});
}
