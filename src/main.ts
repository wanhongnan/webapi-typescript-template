/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2019/3/23
 * 说    明   :  通用程序
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期          作者            说明         
 * 1.0.0.0      2019/3/23         South           创建
 * ********************************************************************************************************************************
 */


import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerProvider, logger } from './utils/log'
import * as rateLimit from 'express-rate-limit';
import { JsonValidation } from './utils/json.validation';
import { JsonExceptionFilter } from './utils/json.exception.filter';
import { JsonResultInterceptor } from './utils/json.result.interceptor';
import express = require('express');
import { from } from 'rxjs';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
var fs = require('fs'); 
var http = require('http'); 
var https = require('https'); 
import {loadConfig,config} from './utils/configs'
var cfg = config();
declare const module: any;

function configApp(app: INestApplication){
  app.useLogger(new LoggerProvider());
  /*app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,        // 15 minutes
      max: 100,                        // limit each IP to 100 requests per windowMs
    }),
  );*/
  app.enableCors({origin:"*"});
  app.useGlobalPipes(new JsonValidation());
  app.useGlobalFilters(new JsonExceptionFilter());
  app.useGlobalInterceptors(new JsonResultInterceptor());
  //app.useGlobalGuards(AuthGuard("bearer"));
}

async function bootstrap1() {
  const httpsOptions = {
    key: fs.readFileSync("./secrets/key.pem"),
    cert: fs.readFileSync("./secrets/cert.pem"),  
    requestCert:true,  //请求客户端证书
    rejectUnauthorized:false //如果没有请求到客户端来自信任CA颁发的证书，拒绝客户端的连接
  };
  await loadConfig();
  const app = await NestFactory.create(AppModule
    //, {httpsOptions}   //使用https访问
    , {logger: true});
  configApp(app);

  var log = logger("main");
  log.info(`log level : ${cfg.logLevel}`);
  log.info(`start http service on port: ${cfg.server.port}`);
  app.listen(cfg.server.port);

  /*
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }*/
}

async function bootstrap2() {
  const httpsOptions = {
    key: fs.readFileSync("./secrets/key.pem"),
    cert: fs.readFileSync("./secrets/cert.pem"),  
    requestCert:true,  //请求客户端证书
    rejectUnauthorized:false //如果没有请求到客户端来自信任CA颁发的证书，拒绝客户端的连接
  };
  await loadConfig();
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {logger: true});
  configApp(app);
  await app.init();

  var log = logger("main");
  log.info(`log level : ${cfg.logLevel}`);
  log.info(`start http service on port: ${cfg.server.port}`);
  log.info(`start https service on port: ${cfg.server.httpsPort}`);
  http.createServer(server).listen(cfg.server.port);
  https.createServer(httpsOptions, server).listen(cfg.server.httpsPort);

  /*
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }*/
}
bootstrap2();

