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
const mongodb = require("mongodb");
const mongodb_1 = require("mongodb");
const grid = require("gridfs-stream");
const configs_1 = require("./configs");
var cfg = configs_1.config();
var amsClient = undefined;
var tansClient = undefined;
function db(dbname = "win007_football") {
    return __awaiter(this, void 0, void 0, function* () {
        if (!amsClient || (amsClient && !amsClient.isConnected()))
            amsClient = yield mongodb_1.MongoClient.connect(cfg.mangodbUrl);
        var db = amsClient.db(dbname);
        return db;
    });
}
exports.db = db;
function transClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tansClient || (tansClient && !tansClient.isConnected()))
            tansClient = yield mongodb_1.MongoClient.connect(cfg.mangodbUrl + "&useNewUrlParser=true&replicaSet=rs2");
        return tansClient;
    });
}
exports.transClient = transClient;
function transDb(dbname = "win007_football") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!tansClient || (tansClient && !tansClient.isConnected()))
                tansClient = yield mongodb_1.MongoClient.connect(cfg.mangodbUrl + "&useNewUrlParser=true&replicaSet=rs2");
            var db = tansClient.db(dbname);
            return db;
        }
        catch (error) {
            return null;
        }
    });
}
exports.transDb = transDb;
function gfs(bulkName) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = yield exports.gfsdb(bulkName);
        var g = grid(db, mongodb);
        g.collection(bulkName);
        return g;
    });
}
exports.gfs = gfs;
function gfsdb(bulkName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bulkName == "sys_imgs") {
            return yield exports.db();
        }
        else {
            return yield exports.db();
        }
    });
}
exports.gfsdb = gfsdb;
