"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
var JsonCode;
(function (JsonCode) {
    JsonCode[JsonCode["OK"] = 200] = "OK";
    JsonCode[JsonCode["ValidationFailed"] = 901] = "ValidationFailed";
    JsonCode[JsonCode["Exception"] = 902] = "Exception";
    JsonCode[JsonCode["MongoError"] = 903] = "MongoError";
    JsonCode[JsonCode["NotFound"] = 404] = "NotFound";
})(JsonCode = exports.JsonCode || (exports.JsonCode = {}));
let JsonResultInterceptor = class JsonResultInterceptor {
    intercept(context, next) {
        return next.handle().pipe(operators_1.map((data) => {
            return { code: JsonCode.OK, msg: "ok", data: data };
        }));
    }
};
JsonResultInterceptor = __decorate([
    common_1.Injectable()
], JsonResultInterceptor);
exports.JsonResultInterceptor = JsonResultInterceptor;
