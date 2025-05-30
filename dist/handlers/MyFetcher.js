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
})({"O7CP7":[function(require,module,exports) {
// Rate limiter to avoid rate limits
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const createRateLimiter = (maxRequests, timeWindow)=>{
    const requests = [];
    return async ()=>{
        const now = Date.now();
        requests.splice(0, requests.length, ...requests.filter((time)=>now - time < timeWindow));
        if (requests.length >= maxRequests) {
            const oldestRequest = requests[0];
            const waitTime = timeWindow - (now - oldestRequest);
            await new Promise((resolve)=>setTimeout(resolve, waitTime));
            return createRateLimiter(maxRequests, timeWindow)();
        }
        requests.push(now);
    };
};
const throttle = createRateLimiter(5, 1000);
class MyFetcher extends Fetcher {
    async *fetch({ handlerInput }) {
        const { data } = handlerInput;
        const headers = data.headers;
        let baseUrl = data.url;
        let nextOffset = null;
        let pageCounter = 0;
        console.log(`🚀 Starting fetch for table: ${data.tableName}`);
        do {
            // Throttle before each request
            await throttle();
            let urlToFetch;
            if (nextOffset) {
                const baseUrlNoOffset = baseUrl.split("?")[0];
                urlToFetch = `${baseUrlNoOffset}?offset=${encodeURIComponent(nextOffset)}`;
            } else urlToFetch = baseUrl;
            console.log(`📄 Fetching page ${pageCounter + 1} with URL: ${urlToFetch}`);
            const response = await FetchUtils.fetchJson(urlToFetch, {
                headers
            });
            if (response.records && response.records.length > 0) yield {
                tableName: data.tableName,
                records: response.records
            };
            nextOffset = response.offset || null;
            pageCounter++;
        }while (nextOffset);
        console.log(`✅ Finished fetching all pages for table: ${data.tableName}`);
    }
}
exports.default = MyFetcher;
globalRefs["MyFetcher"] = MyFetcher;

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

},{}]},["O7CP7"], "O7CP7", "parcelRequire6726")

