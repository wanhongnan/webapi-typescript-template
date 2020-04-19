interface Array<T> {
    where: { <S extends T>(predicate: (value: S, index: number, objs: S[]) => boolean): S[]; };
    first: { <S extends T>(predicate: (value: S, index: number, objs: S[]) => boolean, defaultValue?: S): S; };
    last: { <S extends T>(predicate: (value: S, index: number, objs: S[]) => boolean, defaultValue?: S): S; };
    expend: { <S extends T,U extends any>(callback: (value: S) => U[]) : U[] };
    select: { <S extends T,U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[]; };
}
