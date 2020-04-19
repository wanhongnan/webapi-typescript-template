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
function getTick() {
    var hrtime = process.hrtime();
    return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
}
exports.getTick = getTick;
function deleteUndefined(This) {
    if (This == global)
        return;
    var keys = Object.keys(This);
    for (let key of keys) {
        var v = This[key];
        if (v === undefined)
            delete This[key];
    }
}
exports.deleteUndefined = deleteUndefined;
function copyFrom(classType, obj) {
    var target = Reflect.construct(classType, arguments);
    for (var key in target) {
        if (obj[key] === undefined)
            delete target[key];
        else
            target[key] = obj[key];
    }
    return target;
}
exports.copyFrom = copyFrom;
function delay(time) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((reslove) => {
            setTimeout(() => { reslove(); }, time);
        });
    });
}
exports.delay = delay;
