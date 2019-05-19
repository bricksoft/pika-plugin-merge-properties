'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function beforeBuild({
  options
}) {
  if (!options.properties) {
    return new MessageError('option "properties" must be defined. Example: {"properties": ["myPackageKey1","myPackageKey2"]} Or leave blank: {}');
  }
}
function manifest(newManifest, {
  options,
  cwd
}) {
  const pkg = require(path.join(cwd, "package.json"));

  const properties = options.properties;

  for (const key in newManifest) {
    const t = typeof newManifest[key];

    if (!newManifest.hasOwnProperty(key) || t === "object") {
      if (t === "object") {
        newManifest[key] = _objectSpread({}, newManifest[key], properties[key]);
        break;
      }

      newManifest[key] = properties[key];
    } else {
      if (Array.isArray(newManifest[key])) {
        newManifest[key] = [...newManifest[key], ...properties[key]];
      }

      newManifest[key] = properties[key];
    }
  }

  return newManifest;
}

exports.beforeBuild = beforeBuild;
exports.manifest = manifest;
