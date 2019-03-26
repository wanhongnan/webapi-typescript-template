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


import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JsonCode } from './json.result.interceptor';

/***********************************************************
 * 在代码使用 
    throw new ResultExcetion(JsonCode.ValidationFailed, "Validation failed", errs);
 ***********************************************************/
export class ResultExcetion extends HttpException {
  constructor(code:number,msg:string,data:any = null){
    var err = {
      error : msg,
      message : data,
    };
    super(err,code);
  }
}

/***********************************************************
 * 在 main.ts 文件中添加代码使用 
  app.useGlobalFilters(new JsonExceptionFilter());
 ***********************************************************/
@Catch(Error)
export class JsonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    var rsp = exception.message as any;
    if(exception.name == "MongoError"){
      response.json({
        code: JsonCode.MongoError,
        msg : `MongoDb error : ${exception.message}`,
      });
    }
    else if(exception.getStatus != undefined && rsp.error != undefined){
      var exp = exception as HttpException;
      const status = exp.getStatus();
      var msg = rsp.error;
      var data = rsp.message;
      response.json({
          code: status,
          msg : msg,
          data : data,
        });
    }else{
      response.json({
        code: JsonCode.Exception,
        msg : "server exception",
        data : {
          name : exception.name,
          message: exception.message,
          stack: exception.stack
        },
      });
    }
  }
}
