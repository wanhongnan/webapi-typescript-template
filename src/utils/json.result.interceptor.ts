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


import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export enum JsonCode{
  OK = 200,
  ValidationFailed = 901,
  Exception = 902,
  MongoError = 903,
  NotFound = 404,
}

/***********************************************************
 * 在 main.ts 文件中添加代码使用 
  app.useGlobalInterceptors(new JsonResultInterceptor());
 ***********************************************************/
@Injectable()
export class JsonResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        map((data) => {
          return {code:JsonCode.OK, msg:"ok", data:data};
        }),
      );
  }
}
