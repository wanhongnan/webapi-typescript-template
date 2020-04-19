"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const json_exception_filter_1 = require("./json.exception.filter");
const json_result_interceptor_1 = require("./json.result.interceptor");
let JsonValidation = class JsonValidation {
    transform(value, { metatype }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!metatype)
                return value;
            var mtype = metatype;
            if (Array.isArray(value)) {
                var tp = metatype;
                if (tp.prototype.getItemType == undefined)
                    return value;
                mtype = tp.prototype.getItemType();
            }
            function getErr(err) {
                var path = err.path;
                var msg = `'${path}' : `;
                var keys = Object.keys(err.constraints);
                for (var key of keys) {
                    var v = err.constraints[key];
                    if (typeof (v) == "function")
                        continue;
                    msg = `${msg}${key}() ${v} `;
                }
                return msg;
            }
            const object = class_transformer_1.plainToClass(mtype, value);
            const errors = yield this.validateObject("root", object);
            if (errors.length > 0) {
                var errs = errors.map(f => getErr(f));
                throw new json_exception_filter_1.ResultExcetion(json_result_interceptor_1.JsonCode.ValidationFailed, "Validation failed", errs);
            }
            return value;
        });
    }
    validateArray(path, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = [];
            for (var i in arr) {
                var obj = arr[i];
                var p = `${path}[${i}]`;
                const errs = yield this.validateObject(p, obj);
                ret.push(...errs);
            }
            return ret;
        });
    }
    validateIntenal(path, object) {
        return __awaiter(this, void 0, void 0, function* () {
            var errs = yield class_validator_1.validate(object);
            for (var i of errs) {
                var item = i;
                item.path = `${path}.${i.property}`;
            }
            return errs;
        });
    }
    validateObject(path, object) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = [];
            if (typeof (object) != "object")
                return ret;
            var errs = [];
            if (Array.isArray(object))
                errs = yield this.validateArray(path, object);
            else
                errs = yield this.validateIntenal(path, object);
            if (errs.length > 0)
                ret.push(...errs);
            if (Array.isArray(object))
                return ret;
            errs = [];
            for (var key of Object.keys(object)) {
                var propObj = object[key];
                if (typeof (propObj) != "object")
                    continue;
                var p = `${path}.${key}`;
                if (Array.isArray(propObj))
                    errs = yield this.validateArray(p, propObj);
                else
                    errs = yield this.validateObject(p, propObj);
                if (errs.length > 0)
                    ret.push(...errs);
            }
            return ret;
        });
    }
};
JsonValidation = __decorate([
    common_1.Injectable()
], JsonValidation);
exports.JsonValidation = JsonValidation;
function ItemType(typeFunction) {
    return function (target) {
        target.prototype.getItemType = typeFunction;
    };
}
exports.ItemType = ItemType;
