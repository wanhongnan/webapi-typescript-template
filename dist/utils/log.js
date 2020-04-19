"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = require("log4js");
const configs_1 = require("./configs");
var appcfg = configs_1.config();
function logger(modulename) {
    var path = require('path');
    var cfg = {
        appenders: {
            dateFile: {
                type: 'dateFile',
                filename: 'logs/' + appcfg.logFile,
                pattern: 'yyyy-MM-dd',
                encoding: 'utf-8',
            },
            out: {
                type: 'stdout'
            }
        },
        categories: {
            default: {
                appenders: [
                    'dateFile',
                    'out'
                ], level: appcfg.logLevel
            }
        }
    };
    log4js.configure(cfg);
    var logger = log4js.getLogger(modulename);
    return logger;
}
exports.logger = logger;
function getError(err) {
    return err.message + err.stack;
}
exports.getError = getError;
class LoggerProvider {
    constructor() {
        this.logger = logger("nest");
    }
    log(message) {
        this.logger.info(message);
    }
    error(message, trace) {
        this.logger.error(message + trace);
    }
    warn(message) {
        this.logger.warn(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    verbose(message) {
        this.logger.trace(message);
    }
}
exports.LoggerProvider = LoggerProvider;
