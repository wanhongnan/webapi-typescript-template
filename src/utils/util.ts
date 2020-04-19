/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2017/11/9
 * 说    明   :  通用程序
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期          作者            说明         
 * 1.0.0.0      2017/12/5         South           创建
 * 1.0.0.1      2017/12/13        South           创建
 * 1.0.0.2      2020/04/19        South           添加delay
 * ********************************************************************************************************************************
 */

//get process tick as return, that's format millisecond
export function getTick() : number {
  var hrtime = process.hrtime();
  return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
}

export function deleteUndefined(This:any){
  if (This == global)
    return;
  var keys = Object.keys(This);
  for (let key of keys) {
    var v = This[key];
    if(v === undefined)
      delete This[key];
  }
}

export function copyFrom<T = any>(classType:Function, obj : any) : T{
  var target = Reflect.construct(classType,arguments);
  for(var key in target){
    if(obj[key] === undefined)
      delete target[key];
    else
      target[key] = obj[key];
  }
  return target;
}


/**
 * 使用异步延时
 * @param time 延时时间
 * 
 * 例：启动一个循环定时任务，不需要使用setTimeout，使用起来非常方便
   (async()=>{
     while(true){
        await delay(1000);
        console.log("test");
     }
   })()
 * 
 */
export async function delay(time:number):Promise<any>{
  return new Promise((reslove)=>{
    setTimeout(()=>{reslove()},time);
  });
}


