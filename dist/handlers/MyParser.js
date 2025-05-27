// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9ler4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class MyParser extends Parser {
    parse(fetcherResult, { dataContainer, handlerInput }) {
        const { tableName } = handlerInput.data;
        const containerBuilder = Parser.createContainerBuilder(dataContainer);
        const { isNew, tableBuilder } = containerBuilder.getTable(tableName);
        const { records = [] } = fetcherResult ?? {};
        if (records.length === 0) {
            console.warn(`⚠️ No records to parse for ${tableName}`);
            return containerBuilder.getDataContainer();
        }
        // Only define columns ONCE
        if (isNew) {
            const firstRecord = records.find((r)=>r.fields && Object.keys(r.fields).length > 0);
            const sampleFields = firstRecord?.fields || {};
            const safeHeaders = Object.keys(sampleFields).map((fieldName)=>({
                    id: this.normalizeFieldName(fieldName),
                    dataType: this.detectDataType(sampleFields[fieldName])
                }));
            tableBuilder.addColumnHeaders([
                {
                    id: "record_id",
                    dataType: "string"
                },
                ...safeHeaders
            ]);
        }
        // Always add rows (even if not isNew)
        for (const record of records){
            const baseRow = {
                record_id: record.id || ""
            };
            for (const [key, value] of Object.entries(record.fields ?? {})){
                const normalizedKey = this.normalizeFieldName(key);
                baseRow[normalizedKey] = this.formatValue(value);
            }
            tableBuilder.addRow(baseRow);
        }
        return containerBuilder.getDataContainer();
    }
    detectDataType(value) {
        if (value === null || value === undefined) return "string";
        // Handle arrays - if all elements are same type, use that type
        if (Array.isArray(value)) {
            if (value.length === 0) return "string";
            const elementType = this.detectDataType(value[0]);
            if (value.every((item)=>this.detectDataType(item) === elementType)) return elementType;
            return "string" // Mixed types in array, default to string
            ;
        }
        // Handle dates
        if (value instanceof Date || typeof value === "string" && !isNaN(Date.parse(value))) return "datetime";
        switch(typeof value){
            case "boolean":
                return "boolean";
            case "number":
                return Number.isInteger(value) ? "int" : "float";
            case "object":
                return "string" // JSON stringify objects
                ;
            default:
                return "string";
        }
    }
    normalizeFieldName(name) {
        return name.replace(/\s+/g, "_").replace(/[^\w_]/g, "").toLowerCase().substring(0, 50);
    }
    formatValue(value) {
        try {
            if (value === null || value === undefined) return null;
            // Handle arrays
            if (Array.isArray(value)) {
                if (value.length === 0) return null;
                // If all elements are the same type, format each element
                const formattedValues = value.map((v)=>this.formatValue(v));
                return formattedValues.join(", ");
            }
            // Handle dates
            if (value instanceof Date) return value.toISOString();
            if (typeof value === "string" && !isNaN(Date.parse(value))) return new Date(value).toISOString();
            // Handle other types
            switch(typeof value){
                case "boolean":
                    return value;
                case "number":
                    return value;
                case "object":
                    return JSON.stringify(value);
                default:
                    return String(value);
            }
        } catch  {
            return "[unreadable]";
        }
    }
}
exports.default = MyParser;
globalRefs["MyParser"] = MyParser;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"e4jvP"}],"e4jvP":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["9ler4"], "9ler4", "parcelRequire6726")

