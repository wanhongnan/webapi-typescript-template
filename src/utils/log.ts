/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2017/11/9
 * 说    明   :  日志
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期         作者            说明         
 * 1.0.0.0      2017/11/9        South           创建
 * ********************************************************************************************************************************
 */


var log4js = require("log4js");
import {config} from './configs'
var appcfg = config();

export interface ILog4 {
  trace(msg:string);
  debug(msg:string);
  info(msg:string);
  warn(msg:string);
  error(msg:string);
  fatal(msg:string);
}

export function logger(modulename) : ILog4 {
    var path = require('path');
    var cfg = {
        appenders: {
            dateFile: {
                type: 'dateFile',
                filename: 'logs/' + appcfg.logFile,
                //pattern: 'yyyy-MM-dd-hh',   //一小时存一份
                pattern: 'yyyy-MM-dd',        //一天存一份
                encoding: 'utf-8',
                //compress: true,
                //flags: 'w+'
            },
            out: {
                type: 'stdout'
            }
        },
        categories: {
            default: {
                appenders: [
                    'dateFile'
                    ,'out'
                ], level: appcfg.logLevel // 'trace' 
            }
        }
    };

    log4js.configure(cfg);
    var logger = log4js.getLogger(modulename);
    return logger;
}

export function getError(err:any){
    return err.message + err.stack;
}


import { LoggerService } from '@nestjs/common';
export class LoggerProvider implements LoggerService {
  logger : ILog4;
  constructor(){
    this.logger = logger("nest");
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message + trace);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.trace(message);
  }
}



