/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2020/04/19
 * 说    明   :  linq集合操作
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期         作者            说明         
 * 1.0.0.0      2020/04/19        South           创建
 * ********************************************************************************************************************************
 */

interface Array<T> {
    maxBy: { <U = string | number | ICompare<T>>(callback?: (value: T, index: number, objs: readonly T[]) => U, defaultValue?: T): T; };
    minBy: { <U = string | number | ICompare<T>>(callback?: (value: T, index: number, objs: readonly T[]) => U, defaultValue?: T): T; };
    where: { (predicate: (value: T, index: number, objs: readonly T[]) => boolean): T[]; };
    first: { (predicate?: (value: T, index: number, objs: readonly T[]) => boolean, defaultValue?: T): T; };
    last: { (predicate?: (value: T, index: number, objs: readonly T[]) => boolean, defaultValue?: T): T; };
    expend: { <U extends any>(callback: (value: T) => U[]) : U[] };
    select: { <U>(callback: (value: T, index: number, objs: readonly T[]) => U): U[]; };
    distinct: { <U>(callback?: (value: T, index: number, objs: readonly T[]) => U): T[]; };
    rand: { (defaultValue?: T): T; };
    groupBy: { <U = string | number>(callback: (value: T, index: number, objs: readonly T[]) => U) : Array<{key:U,value:T[]}> }
    each: { (callback: (value: T, index: number, objs: readonly T[]) => void): T[]; };
    sortByAsc: { <U = string | number | ICompare<T>>(callback?: (value: T, index: number, objs: readonly T[]) => U, ): T[]; };
    sortByDsc: { <U = string | number | ICompare<T>>(callback?: (value: T, index: number, objs: readonly T[]) => U, ): T[]; };
    clone: { (): T[]; };
}

interface ICompare<T>{
    compare(value:ICompare<T>):number
}

