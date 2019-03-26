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

import { FindAndModifyWriteOpResultObject, CommonOptions, FilterQuery } from "mongodb";

export interface FindAndModifyOption extends CommonOptions {
  remove? : boolean;
  upsert? : boolean;
  new? : boolean;
  projection?: object;
  arrayFilters?: object[];
}

type Default = any;
export interface DbCollection<TSchema = Default>{
  findAndModify(
    query? : FilterQuery<TSchema>,
    sort? : any[] | object,
    doc? : TSchema | SetDocument<TSchema>,
    options? : FindAndModifyOption
  ) : Promise<FindAndModifyWriteOpResultObject<TSchema>>;
}

export interface SetDocument<TSchema = Default> {
  $set? : TSchema
}
