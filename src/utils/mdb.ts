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


import * as mongodb from "mongodb"
import {MongoClient,Db} from "mongodb"
import * as grid from "gridfs-stream"
import {config} from './configs'
var cfg = config();

var amsClient : MongoClient = undefined;
var tansClient : MongoClient = undefined;

export async function db(dbname:string = "win007_football") : Promise<Db> {
  if(!amsClient || (amsClient && !amsClient.isConnected()))
    amsClient = await MongoClient.connect(cfg.mangodbUrl);
  var db = amsClient.db(dbname);
  return db;
}

export async function transClient() : Promise<MongoClient>{
  if(!tansClient || (tansClient && !tansClient.isConnected()))
    tansClient = await MongoClient.connect(cfg.mangodbUrl+"&useNewUrlParser=true&replicaSet=rs2");
  return tansClient;
}

export async function transDb(dbname:string = "win007_football") : Promise<Db>{
  try {
    if(!tansClient || (tansClient && !tansClient.isConnected()))
    tansClient = await MongoClient.connect(cfg.mangodbUrl+"&useNewUrlParser=true&replicaSet=rs2");
    var db = tansClient.db(dbname);
    return db;
  } catch (error) {
    return null;
  }
}

export async function gfs(bulkName) : Promise<grid.Grid> {
  var db = await exports.gfsdb(bulkName);
  var g = grid(db, mongodb);
  g.collection(bulkName);
  return g;  
}

export async function gfsdb(bulkName) : Promise<Db>{
  if(bulkName == "sys_imgs"){
    return await exports.db();
  }else{
    return await exports.db();
  }
}


