"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const log_1 = require("./utils/log");
const json_validation_1 = require("./utils/json.validation");
const json_exception_filter_1 = require("./utils/json.exception.filter");
const json_result_interceptor_1 = require("./utils/json.result.interceptor");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
var fs = require('fs');
var http = require('http');
var https = require('https');
const configs_1 = require("./utils/configs");
var cfg = configs_1.config();
function configApp(app) {
    app.useLogger(new log_1.LoggerProvider());
    app.enableCors({ origin: "*" });
    app.useGlobalPipes(new json_validation_1.JsonValidation());
    app.useGlobalFilters(new json_exception_filter_1.JsonExceptionFilter());
    app.useGlobalInterceptors(new json_result_interceptor_1.JsonResultInterceptor());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Template example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
}
function bootstrap1() {
    return __awaiter(this, void 0, void 0, function* () {
        const httpsOptions = {
            key: fs.readFileSync("./secrets/key.pem"),
            cert: fs.readFileSync("./secrets/cert.pem"),
            requestCert: true,
            rejectUnauthorized: false
        };
        yield configs_1.loadConfig();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { logger: true });
        configApp(app);
        var log = log_1.logger("main");
        log.info(`log level : ${cfg.logLevel}`);
        log.info(`start http service on port: ${cfg.server.port}`);
        app.listen(cfg.server.port);
    });
}
function bootstrap2() {
    return __awaiter(this, void 0, void 0, function* () {
        const httpsOptions = {
            key: fs.readFileSync("./secrets/key.pem"),
            cert: fs.readFileSync("./secrets/cert.pem"),
            requestCert: true,
            rejectUnauthorized: false
        };
        yield configs_1.loadConfig();
        const server = express();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), { logger: true });
        configApp(app);
        yield app.init();
        var log = log_1.logger("main");
        log.info(`log level : ${cfg.logLevel}`);
        log.info(`start http service on port: ${cfg.server.port}`);
        log.info(`start https service on port: ${cfg.server.httpsPort}`);
        http.createServer(server).listen(cfg.server.port);
        https.createServer(httpsOptions, server).listen(cfg.server.httpsPort);
    });
}
bootstrap2();
