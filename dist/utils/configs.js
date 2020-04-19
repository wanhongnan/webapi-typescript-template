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
const path = require('path');
const fs = require('fs');
const JSON5 = require('json5');
var data = {};
function loadConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((reslove, reject) => {
            const file = path.join(process.cwd(), 'configs.json5');
            fs.readFile(file, function (err, txt) {
                if (err)
                    console.error(err);
                var obj = JSON5.parse(txt);
                Object.assign(data, obj);
                console.dir(data);
                reslove(true);
            });
        });
    });
}
exports.loadConfig = loadConfig;
function config() {
    return data;
}
exports.config = config;
