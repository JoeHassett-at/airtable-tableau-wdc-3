"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Statement = exports.Database = exports.Connection = exports.OPEN_SHAREDCACHE = exports.OPEN_READWRITE = exports.OPEN_READONLY = exports.OPEN_PRIVATECACHE = exports.OPEN_FULLMUTEX = exports.OPEN_CREATE = exports.QueryResult = void 0;
/**
 * A wrapper around DuckDb node.js API that mirrors that
 * API but uses Promises instead of callbacks.
 *
 */
var duckdb = __importStar(require("duckdb"));
var util = __importStar(require("util"));
var duckdb_1 = require("duckdb");
__createBinding(exports, duckdb_1, "QueryResult");
__createBinding(exports, duckdb_1, "OPEN_CREATE");
__createBinding(exports, duckdb_1, "OPEN_FULLMUTEX");
__createBinding(exports, duckdb_1, "OPEN_PRIVATECACHE");
__createBinding(exports, duckdb_1, "OPEN_READONLY");
__createBinding(exports, duckdb_1, "OPEN_READWRITE");
__createBinding(exports, duckdb_1, "OPEN_SHAREDCACHE");
/*
 * Implmentation note:
 *   Although the method types exposed to users of this library
 *   are reasonably precise, the unfortunate excessive use of
 *   `any` in this utility function is because writing a precise
 *   type for a generic higher order function like
 *   `util.promisify` is beyond the current capabilities of the
 *   TypeScript type system.
 *   See https://github.com/Microsoft/TypeScript/issues/5453
 *   for detailed discussion.
 */
function methodPromisify(methodFn) {
    return util.promisify(function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return methodFn.bind(target).apply(void 0, args);
    });
}
var connAllAsync = methodPromisify(duckdb.Connection.prototype.all);
var connArrowIPCAll = methodPromisify(duckdb.Connection.prototype.arrowIPCAll);
var connExecAsync = methodPromisify(duckdb.Connection.prototype.exec);
var connPrepareAsync = methodPromisify(duckdb.Connection.prototype.prepare);
var connRunAsync = methodPromisify(duckdb.Connection.prototype.run);
var connUnregisterUdfAsync = methodPromisify(duckdb.Connection.prototype.unregister_udf);
var connRegisterBufferAsync = methodPromisify(duckdb.Connection.prototype.register_buffer);
var connUnregisterBufferAsync = methodPromisify(duckdb.Connection.prototype.unregister_buffer);
var Connection = /** @class */ (function () {
    function Connection(ddb, resolve, reject) {
        var _this = this;
        this.conn = null;
        this.conn = new duckdb.Connection(ddb, function (err, res) {
            if (err) {
                _this.conn = null;
                reject(err);
            }
            resolve(_this);
        });
    }
    /**
     * Static method to create a new Connection object. Provided because constructors can not return Promises,
     * and the DuckDb Node.JS API uses a callback in the Database constructor
     */
    Connection.create = function (db) {
        return new Promise(function (resolve, reject) {
            new Connection(db.get_ddb_internal(), resolve, reject);
        });
    };
    Connection.prototype.all = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.conn) {
                    throw new Error("Connection.all: uninitialized connection");
                }
                return [2 /*return*/, connAllAsync.apply(void 0, __spreadArray([this.conn, sql], args, false))];
            });
        });
    };
    Connection.prototype.arrowIPCAll = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.conn) {
                    throw new Error("Connection.arrowIPCAll: uninitialized connection");
                }
                return [2 /*return*/, connArrowIPCAll.apply(void 0, __spreadArray([this.conn, sql], args, false))];
            });
        });
    };
    /**
     * Executes the sql query and invokes the callback for each row of result data.
     * Since promises can only resolve once, this method uses the same callback
     * based API of the underlying DuckDb NodeJS API
     * @param sql query to execute
     * @param args parameters for template query
     * @returns
     */
    Connection.prototype.each = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.conn) {
            throw new Error("Connection.each: uninitialized connection");
        }
        (_a = this.conn).each.apply(_a, __spreadArray([sql], args, false));
    };
    /**
     * Execute one or more SQL statements, without returning results.
     * @param sql queries or statements to executes (semicolon separated)
     * @param args parameters if `sql` is a parameterized template
     * @returns `Promise<void>` that resolves when all statements have been executed.
     */
    Connection.prototype.exec = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.conn) {
                    throw new Error("Connection.exec: uninitialized connection");
                }
                return [2 /*return*/, connExecAsync.apply(void 0, __spreadArray([this.conn, sql], args, false))];
            });
        });
    };
    Connection.prototype.prepareSync = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.conn) {
            throw new Error("Connection.prepareSync: uninitialized connection");
        }
        var ddbStmt = (_a = this.conn).prepare.apply(_a, __spreadArray([sql], args, false));
        return Statement.create_internal(ddbStmt);
    };
    Connection.prototype.prepare = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var stmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.conn) {
                            throw new Error("Connection.prepare: uninitialized connection");
                        }
                        return [4 /*yield*/, connPrepareAsync.apply(void 0, __spreadArray([this.conn, sql], args, false))];
                    case 1:
                        stmt = _a.sent();
                        return [2 /*return*/, Statement.create_internal(stmt)];
                }
            });
        });
    };
    Connection.prototype.runSync = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.conn) {
            throw new Error("Connection.runSync: uninitialized connection");
        }
        // We need the 'as any' cast here, because run dynamically checks
        // types of args to determine if a callback function was passed in
        var ddbStmt = (_a = this.conn).run.apply(_a, __spreadArray([sql], args, false));
        return Statement.create_internal(ddbStmt);
    };
    Connection.prototype.run = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var stmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.conn) {
                            throw new Error("Connection.runSync: uninitialized connection");
                        }
                        return [4 /*yield*/, connRunAsync.apply(void 0, __spreadArray([this.conn, sql], args, false))];
                    case 1:
                        stmt = _a.sent();
                        return [2 /*return*/, Statement.create_internal(stmt)];
                }
            });
        });
    };
    Connection.prototype.register_udf = function (name, return_type, fun) {
        if (!this.conn) {
            throw new Error("Connection.register_udf: uninitialized connection");
        }
        this.conn.register_udf(name, return_type, fun);
    };
    Connection.prototype.unregister_udf = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.conn) {
                    throw new Error("Connection.unregister_udf: uninitialized connection");
                }
                return [2 /*return*/, connUnregisterUdfAsync(this.conn, name)];
            });
        });
    };
    Connection.prototype.register_bulk = function (name, return_type, fun) {
        if (!this.conn) {
            throw new Error("Connection.register_bulk: uninitialized connection");
        }
        this.conn.register_bulk(name, return_type, fun);
    };
    Connection.prototype.stream = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.conn) {
            throw new Error("Connection.stream: uninitialized connection");
        }
        return (_a = this.conn).stream.apply(_a, __spreadArray([sql], args, false));
    };
    Connection.prototype.arrowIPCStream = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.conn) {
            throw new Error("Connection.arrowIPCStream: uninitialized connection");
        }
        return (_a = this.conn).arrowIPCStream.apply(_a, __spreadArray([sql], args, false));
    };
    Connection.prototype.register_buffer = function (name, array, force) {
        if (!this.conn) {
            throw new Error("Connection.register_buffer: uninitialized connection");
        }
        return connRegisterBufferAsync(this.conn, name, array, force);
    };
    Connection.prototype.unregister_buffer = function (name) {
        if (!this.conn) {
            throw new Error("Connection.unregister_buffer: uninitialized connection");
        }
        return connUnregisterBufferAsync(this.conn, name);
    };
    return Connection;
}());
exports.Connection = Connection;
var dbCloseAsync = methodPromisify(duckdb.Database.prototype.close);
var dbAllAsync = methodPromisify(duckdb.Database.prototype.all);
var dbArrowIPCAll = methodPromisify(duckdb.Database.prototype.arrowIPCAll);
var dbExecAsync = methodPromisify(duckdb.Database.prototype.exec);
var dbPrepareAsync = methodPromisify(duckdb.Database.prototype.prepare);
var dbRunAsync = methodPromisify(duckdb.Database.prototype.run);
var dbUnregisterUdfAsync = methodPromisify(duckdb.Database.prototype.unregister_udf);
var dbSerializeAsync = methodPromisify(duckdb.Database.prototype.serialize);
var dbParallelizeAsync = methodPromisify(duckdb.Database.prototype.parallelize);
var dbWaitAsync = methodPromisify(duckdb.Database.prototype.wait);
var dbRegisterBufferAsync = methodPromisify(duckdb.Database.prototype.register_buffer);
var dbUnregisterBufferAsync = methodPromisify(duckdb.Database.prototype.unregister_buffer);
var Database = /** @class */ (function () {
    function Database(path, accessMode, resolve, reject) {
        var _this = this;
        this.db = null;
        this.db = new duckdb.Database(path, accessMode, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(_this);
        });
    }
    /**
     * Static method to create a new Database object. Provided because constructors can not return Promises,
     * and the DuckDb Node.JS API uses a callback in the Database constructor
     */
    /**
     * Static method to create a new Database object from the specified file. Provided as a static
     * method because some initialization may happen asynchronously.
     * @param path path to database file to open, or ":memory:"
     * @returns a promise that resolves to newly created Database object
     */
    Database.create = function (path, accessMode) {
        var trueAccessMode = accessMode !== null && accessMode !== void 0 ? accessMode : duckdb.OPEN_READWRITE; // defaults to OPEN_READWRITE
        return new Promise(function (resolve, reject) {
            new Database(path, trueAccessMode, resolve, reject);
        });
    };
    Database.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) {
                            throw new Error("Database.close: uninitialized database");
                        }
                        return [4 /*yield*/, dbCloseAsync(this.db)];
                    case 1:
                        _a.sent();
                        this.db = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    // accessor to get internal duckdb Database object -- internal use only
    Database.prototype.get_ddb_internal = function () {
        if (!this.db) {
            throw new Error("Database.get_ddb_internal: uninitialized database");
        }
        return this.db;
    };
    Database.prototype.connect = function () {
        return Connection.create(this);
    };
    Database.prototype.all = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new Error("Database.all: uninitialized database");
                }
                return [2 /*return*/, dbAllAsync.apply(void 0, __spreadArray([this.db, sql], args, false))];
            });
        });
    };
    Database.prototype.arrowIPCAll = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new Error("Database.arrowIPCAll: uninitialized connection");
                }
                return [2 /*return*/, dbArrowIPCAll.apply(void 0, __spreadArray([this.db, sql], args, false))];
            });
        });
    };
    /**
     * Executes the sql query and invokes the callback for each row of result data.
     * Since promises can only resolve once, this method uses the same callback
     * based API of the underlying DuckDb NodeJS API
     * @param sql query to execute
     * @param args parameters for template query
     * @returns
     */
    Database.prototype.each = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.db) {
            throw new Error("Database.each: uninitialized database");
        }
        (_a = this.db).each.apply(_a, __spreadArray([sql], args, false));
    };
    /**
     * Execute one or more SQL statements, without returning results.
     * @param sql queries or statements to executes (semicolon separated)
     * @param args parameters if `sql` is a parameterized template
     * @returns `Promise<void>` that resolves when all statements have been executed.
     */
    Database.prototype.exec = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new Error("Database.exec: uninitialized database");
                }
                return [2 /*return*/, dbExecAsync.apply(void 0, __spreadArray([this.db, sql], args, false))];
            });
        });
    };
    Database.prototype.prepareSync = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.db) {
            throw new Error("Database.prepareSync: uninitialized database");
        }
        var ddbStmt = (_a = this.db).prepare.apply(_a, __spreadArray([sql], args, false));
        return Statement.create_internal(ddbStmt);
    };
    Database.prototype.prepare = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var stmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) {
                            throw new Error("Database.prepare: uninitialized database");
                        }
                        return [4 /*yield*/, dbPrepareAsync.apply(void 0, __spreadArray([this.db, sql], args, false))];
                    case 1:
                        stmt = _a.sent();
                        return [2 /*return*/, Statement.create_internal(stmt)];
                }
            });
        });
    };
    Database.prototype.runSync = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.db) {
            throw new Error("Database.runSync: uninitialized database");
        }
        // We need the 'as any' cast here, because run dynamically checks
        // types of args to determine if a callback function was passed in
        var ddbStmt = (_a = this.db).run.apply(_a, __spreadArray([sql], args, false));
        return Statement.create_internal(ddbStmt);
    };
    Database.prototype.run = function (sql) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var stmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) {
                            throw new Error("Database.runSync: uninitialized database");
                        }
                        return [4 /*yield*/, dbRunAsync.apply(void 0, __spreadArray([this.db, sql], args, false))];
                    case 1:
                        stmt = _a.sent();
                        return [2 /*return*/, Statement.create_internal(stmt)];
                }
            });
        });
    };
    Database.prototype.register_udf = function (name, return_type, fun) {
        if (!this.db) {
            throw new Error("Database.register: uninitialized database");
        }
        this.db.register_udf(name, return_type, fun);
    };
    Database.prototype.unregister_udf = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new Error("Database.unregister: uninitialized database");
                }
                return [2 /*return*/, dbUnregisterUdfAsync(this.db, name)];
            });
        });
    };
    Database.prototype.stream = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.db) {
            throw new Error("Database.stream: uninitialized database");
        }
        return (_a = this.db).stream.apply(_a, __spreadArray([sql], args, false));
    };
    Database.prototype.arrowIPCStream = function (sql) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.db) {
            throw new Error("Database.arrowIPCStream: uninitialized database");
        }
        return (_a = this.db).arrowIPCStream.apply(_a, __spreadArray([sql], args, false));
    };
    Database.prototype.serialize = function () {
        if (!this.db) {
            throw new Error("Database.serialize: uninitialized database");
        }
        return dbSerializeAsync(this.db);
    };
    Database.prototype.parallelize = function () {
        if (!this.db) {
            throw new Error("Database.parallelize: uninitialized database");
        }
        return dbParallelizeAsync(this.db);
    };
    Database.prototype.wait = function () {
        if (!this.db) {
            throw new Error("Database.wait: uninitialized database");
        }
        return dbWaitAsync(this.db);
    };
    Database.prototype.interrupt = function () {
        if (!this.db) {
            throw new Error("Database.interrupt: uninitialized database");
        }
        return this.db.interrupt();
    };
    Database.prototype.register_buffer = function (name, array, force) {
        if (!this.db) {
            throw new Error("Database.register_buffer: uninitialized database");
        }
        return dbRegisterBufferAsync(this.db, name, array, force);
    };
    Database.prototype.unregister_buffer = function (name) {
        if (!this.db) {
            throw new Error("Database.unregister_buffer: uninitialized database");
        }
        return dbUnregisterBufferAsync(this.db, name);
    };
    Database.prototype.registerReplacementScan = function (replacementScan) {
        if (!this.db) {
            throw new Error("Database.registerReplacementScan: uninitialized database");
        }
        return this.db.registerReplacementScan(replacementScan);
    };
    return Database;
}());
exports.Database = Database;
var stmtRunAsync = methodPromisify(duckdb.Statement.prototype.run);
var stmtFinalizeAsync = methodPromisify(duckdb.Statement.prototype.finalize);
var stmtAllAsync = methodPromisify(duckdb.Statement.prototype.all);
var stmtArrowIPCAllAsync = methodPromisify(duckdb.Statement.prototype.arrowIPCAll);
var Statement = /** @class */ (function () {
    /**
     * Construct an async wrapper from a statement
     */
    function Statement(stmt) {
        this.stmt = stmt;
    }
    /**
     * create a Statement object that wraps a duckdb.Statement.
     * This is intended for internal use only, and should not be called directly.
     * Use `Database.prepare()` or `Database.run()` to create Statement objects.
     */
    Statement.create_internal = function (stmt) {
        return new Statement(stmt);
    };
    Statement.prototype.all = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stmtAllAsync.apply(void 0, __spreadArray([this.stmt], args, false))];
            });
        });
    };
    Statement.prototype.arrowIPCAll = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stmtArrowIPCAllAsync.apply(void 0, __spreadArray([this.stmt], args, false))];
            });
        });
    };
    /**
     * Executes the sql query and invokes the callback for each row of result data.
     * Since promises can only resolve once, this method uses the same callback
     * based API of the underlying DuckDb NodeJS API
     * @param args parameters for template query, followed by a NodeJS style
     *             callback function invoked for each result row.
     *
     * @returns
     */
    Statement.prototype.each = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.stmt).each.apply(_a, args);
    };
    /**
     * Call `duckdb.Statement.run` directly without awaiting completion.
     * @param args arguments passed to duckdb.Statement.run()
     * @returns this
     */
    Statement.prototype.runSync = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.stmt).run.apply(_a, args);
        return this;
    };
    Statement.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stmtRunAsync.apply(void 0, __spreadArray([this.stmt], args, false))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Statement.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stmtFinalizeAsync(this.stmt)];
            });
        });
    };
    return Statement;
}());
exports.Statement = Statement;
