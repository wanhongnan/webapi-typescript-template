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
import linq = require('src/utils/linq');
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
// @UseGuards(AuthGuard("bearer"))     //使用OAuth 2.0 验证
export default class {
  constructor(){}

  @Get("test")
  test(@Req() req){
    var r = new SchoolTest().run();
    return r;
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

class SchoolTest{
  school = new School();
  run(){
    this.school.init(1);
    var students = this.school.classes.where(f=> f.classIdx > 2 && f.classIdx <= 5).expend(f=>f.students).where(f=> f.studentIdx > 5).map(f=>f.studentIdx);
    console.log(students);
  }
}

class School{
  schoolName: string  = "";
  schoolIdx : number;
  classes : Array<Sclass> = [];
  init(i:number){
    this.schoolIdx = i;
    this.schoolName = `class:${i}`;
    for (let index = 0; index < 15; index++) {
      var sc = new Sclass();
      sc.init(index);
      this.classes.push(sc);
    }
  }
}

class Sclass{
  classIdx : number;
  className: string  = "";
  students: Array<Student> = [];
  init(i:number){
    this.classIdx = i;
    this.className = `class:${i}`;
    for (let index = 0; index < 10; index++) {
      var st = new Student();
      st.init(index);
      this.students.push(st);
    }
  }
}

class Student{
  studentIdx : number;
  studentName: string  = "";
  init(i:number){
    this.studentIdx = i;
    this.studentName = `student:${i}`;
  }
}
