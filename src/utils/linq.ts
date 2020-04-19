
Array.prototype.where = Array.prototype.filter;
Array.prototype.first = function<S>(predicate, defaultValue):S{
    var arr = this as Array<S>;
    var idx = arr.findIndex((value: S, index: number, objs: S[])=>predicate(value, index, objs));
    if(idx == -1)return defaultValue;
    return arr[idx];
}
Array.prototype.last = function<S>(predicate, defaultValue):S{
    var arr = this as Array<S>;
    // var idx = arr.lastIndexOf((value: S, index: number, objs: S[])=>predicate(value, index, objs));
    for (let index = arr.length-1; index >= 0; index++) {
        const value = arr[index];
        if(predicate(value, index, arr))
            return value;
    }
    return defaultValue;
}
Array.prototype.expend = function<S,U>(callback): U[]{
    var arrS = this as Array<S>;
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
