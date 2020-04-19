
Array.prototype.select = Array.prototype.map;
Array.prototype.where = Array.prototype.filter;
Array.prototype.first = function(predicate, defaultValue):any{
    var arr = this as Array<any>;
    var idx = arr.findIndex((value: any, index: number, objs: any[])=>predicate(value, index, objs));
    if(idx == -1)return defaultValue;
    return arr[idx];
}
Array.prototype.last = function(predicate, defaultValue):any{
    var arr = this as Array<any>;
    // var idx = arr.lastIndexOf((value: any, index: number, objs: any[])=>predicate(value, index, objs));
    for (let index = arr.length-1; index >= 0; index++) {
        const value = arr[index];
        if(predicate(value, index, arr))
            return value;
    }
    return defaultValue;
}
Array.prototype.expend = function<U>(callback): U[]{
    var arrS = this as Array<any>;
    var arrU = Array<U>();
    arrS.forEach(s=>{
        var subArrU = callback(s)
        if(!subArrU && Array.isArray(subArrU)){
            subArrU.forEach(u=>{
                arrU.push(u)
            })
        }
    })
    return arrU;
}

export {}
