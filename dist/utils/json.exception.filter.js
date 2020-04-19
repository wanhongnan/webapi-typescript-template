"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const json_result_interceptor_1 = require("./json.result.interceptor");
class ResultExcetion extends common_1.HttpException {
    constructor(code, msg, data = null) {
        var err = {
            error: msg,
            message: data,
        };
        super(err, code);
    }
}
exports.ResultExcetion = ResultExcetion;
let JsonExceptionFilter = class JsonExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        var rsp = exception.message;
        if (exception.name == "MongoError") {
            response.json({
                code: json_result_interceptor_1.JsonCode.MongoError,
                msg: `MongoDb error : ${exception.message}`,
            });
        }
        else if (exception.getStatus != undefined && rsp.error != undefined) {
            var exp = exception;
            const status = exp.getStatus();
            var msg = rsp.error;
            var data = rsp.message;
            response.json({
                code: status,
                msg: msg,
                data: data,
            });
        }
        else {
            response.json({
                code: json_result_interceptor_1.JsonCode.Exception,
                msg: "server exception",
                data: {
                    name: exception.name,
                    message: exception.message,
                    stack: exception.stack
                },
            });
        }
    }
};
JsonExceptionFilter = __decorate([
    common_1.Catch(Error)
], JsonExceptionFilter);
exports.JsonExceptionFilter = JsonExceptionFilter;
