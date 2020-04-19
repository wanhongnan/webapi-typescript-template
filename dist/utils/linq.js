"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.where = Array.prototype.filter;
Array.prototype.first = function (predicate, defaultValue) {
    var arr = this;
    var idx = arr.findIndex((value, index, objs) => predicate(value, index, objs));
    if (idx == -1)
        return defaultValue;
    return arr[idx];
};
Array.prototype.last = function (predicate, defaultValue) {
    var arr = this;
    for (let index = arr.length - 1; index >= 0; index++) {
        const value = arr[index];
        if (predicate(value, index, arr))
            return value;
    }
    return defaultValue;
};
Array.prototype.expend = function (callback) {
    var arrS = this;
    var arrU = Array();
    arrS.forEach(s => {
        var subArrU = callback(s);
        if (!subArrU && Array.isArray(subArrU)) {
            subArrU.forEach(u => {
                arrU.push(u);
            });
        }
    });
    return arrU;
};
