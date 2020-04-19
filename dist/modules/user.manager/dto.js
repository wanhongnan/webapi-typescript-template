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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const json_validation_1 = require("src/utils/json.validation");
class UserDto {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], UserDto.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], UserDto.prototype, "userPhone", void 0);
exports.UserDto = UserDto;
let UserDtos = class UserDtos extends Array {
};
UserDtos = __decorate([
    json_validation_1.ItemType(() => UserDto)
], UserDtos);
exports.UserDtos = UserDtos;
