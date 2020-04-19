"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const dto_1 = require("./dto");
const mdb = require("src/utils/mdb");
const schema_1 = require("./schema");
const util = require("src/utils/util");
let default_1 = class default_1 {
    constructor() { }
    test(req) {
        var r = new SchoolTest().run();
        return r;
        return req.user;
    }
    addUsers(users) {
        return __awaiter(this, void 0, void 0, function* () {
            var db = yield mdb.db();
            var coll = db.collection("user");
            var rets = [];
            for (var c of users) {
                var _id = c.userId;
                var data = util.copyFrom(schema_1.UserSchema, c);
                data._id = c.userId;
                var ret = coll.update({ _id }, { $set: data }, { upsert: true });
                rets.push(ret);
            }
            var r = yield Promise.all(rets);
            return r.map((f) => { return f.result.ok; });
        });
    }
};
__decorate([
    common_1.Get("test"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "test", null);
__decorate([
    common_1.Post("addusers"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserDtos]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "addUsers", null);
default_1 = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [])
], default_1);
exports.default = default_1;
class SchoolTest {
    constructor() {
        this.school = new School();
    }
    run() {
        this.school.init(1);
        var students = this.school.classes.where(f => f.classIdx > 2 && f.classIdx <= 5).expend(f => f.students).where(f => f.studentIdx > 5);
        console.log(students);
    }
}
class School {
    constructor() {
        this.schoolName = "";
        this.classes = [];
    }
    init(i) {
        this.schoolIdx = i;
        this.schoolName = `class:${i}`;
        for (let index = 0; index < 15; index++) {
            var sc = new Sclass();
            sc.init(index);
            this.classes.push(sc);
        }
    }
}
class Sclass {
    constructor() {
        this.className = "";
        this.students = [];
    }
    init(i) {
        this.classIdx = i;
        this.className = `class:${i}`;
        for (let index = 0; index < 10; index++) {
            var st = new Student();
            st.init(index);
            this.students.push(st);
        }
    }
}
class Student {
    constructor() {
        this.studentName = "";
    }
    init(i) {
        this.studentIdx = i;
        this.studentName = `student:${i}`;
    }
}
