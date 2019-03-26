/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2019/3/23
 * 说    明   :  通用程序
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期          作者            说明         
 * 1.0.0.0      2019/3/23         South           创建
 * ********************************************************************************************************************************
 */


import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Type, Body } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass, TypeHelpOptions } from 'class-transformer';
import { ResultExcetion } from './json.exception.filter';
import { JsonCode } from './json.result.interceptor';

/***********************************************************
 * 在 main.ts 文件中添加代码使用
  app.useGlobalFilters(new JsonExceptionFilter());
  验证方法列表：
  https://github.com/typestack/class-validator#installation
 ***********************************************************/
@Injectable()
export class JsonValidation implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) 
      return value;

    var mtype = metatype;
    if(Array.isArray(value)){
      var tp = metatype as any;
      if(tp.prototype.getItemType == undefined)
        return value;
      mtype = tp.prototype.getItemType();  
    }
    function getErr(err:ValidationError):string{
      var path = (err as any).path;
      var msg = `'${path}' : `;
      var keys = Object.keys(err.constraints);
      for(var key of keys){
        var v = err.constraints[key];
        if(typeof(v) == "function")
          continue;
        msg = `${msg}${key}() ${v} `;
      }
      return msg;
    }

    //https://github.com/typestack/class-transformer
    const object = plainToClass(mtype, value) as any;
    const errors = await this.validateObject("root", object);
    if (errors.length > 0) {
      var errs = errors.map(f=> getErr(f));
      throw new ResultExcetion(JsonCode.ValidationFailed, "Validation failed", errs);
    }
    return value;
  }

  async validateArray(path:string, arr: any):Promise<ValidationError[]>{
    var ret = [];
    for(var i in arr){
      var obj = arr[i];
      var p = `${path}[${i}]`;
      const errs = await this.validateObject(p,obj);
      ret.push(...errs);
    }
    return ret;
  }

  async validateIntenal(path:string, object: any):Promise<ValidationError[]>{
    var errs = await validate(object);
    for(var i of errs){
      var item = i as any;
      item.path = `${path}.${i.property}`;
    }
    return errs;
  }

  async validateObject(path:string, object: any):Promise<ValidationError[]>{
    var ret = [];
    if(typeof(object) != "object")   
      return ret;
    var errs = [];
    if(Array.isArray(object))
      errs = await this.validateArray(path, object);
    else
      errs = await this.validateIntenal(path, object);
    if(errs.length > 0)
      ret.push(...errs);
    
    if(Array.isArray(object))
      return ret;

    errs = [];
    for(var key of Object.keys(object)){
      var propObj = object[key];
      if( typeof(propObj) != "object")
        continue;
      var p = `${path}.${key}`;
      if(Array.isArray(propObj))
        errs = await this.validateArray(p, propObj);
      else
        errs = await this.validateObject(p, propObj);
      if(errs.length > 0)
        ret.push(...errs);
    }
    return ret;
  }
}

export function ItemType(typeFunction: (type?: TypeHelpOptions) => Function){
  return function(target: any){
    target.prototype.getItemType = typeFunction;
  }
}


