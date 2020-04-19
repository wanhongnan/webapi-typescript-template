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


import { Controller,Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UserDtos } from './dto';
import * as mdb from "src/utils/mdb";
import { WriteOpResult } from 'mongodb';
import { UserSchema } from './schema';
import * as util from "src/utils/util"
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
// @UseGuards(AuthGuard("bearer"))     //使用OAuth 2.0 验证
export default class {
  constructor(){}

  @Get("test")
  test(@Req() req){
    return "asff";
    return req.user;
  }

  @Post("addusers")
  async addUsers(@Body() users:UserDtos) : Promise<any>   {
    var db = await mdb.db();
    var coll = db.collection("user");
    var rets : Promise<WriteOpResult>[] = [];
    for(var c of users){
      var _id = c.userId;
      var data  = util.copyFrom<UserSchema>(UserSchema,c);
      data._id = c.userId;
      var ret =  coll.update({_id}, {$set: data}, {upsert:true});
      rets.push(ret);
    }
    var r = await Promise.all(rets);
    return r.map((f)=> {return f.result.ok});
  }
}

