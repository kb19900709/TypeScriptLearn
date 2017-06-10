/**
 * 參數級別裝飾器
 * 不需要回傳任何值
 * 記錄有被標誌的參數索引，通常配合函數裝飾器一起使用
 * 
 * @param target Object.prototype
 * @param key Function name
 * @param parameterIndex Parameter index
 * @see ValidRequired
 */
export function Required(target: any, key: string, parameterIndex: number): void {
    let matadataKey = `log_${key}_args`;
    let metaData: Number[] = target[matadataKey] || [];
    metaData.push(parameterIndex);

    target[matadataKey] = metaData;
}

/**
 * 配合參數裝飾器的簡單驗證範例
 * 
 * @param target Object.prototype
 * @param key Function name
 * @param descriptor Property desc
 * @see Required
 */
export function ValidRequired(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const className = target.constructor.name;
    let matadataKey = `log_${key}_args`;
    let originalFun: Function = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        let metaData = target[matadataKey];
        for (let parameterIndex of metaData) {
            if (validateParam(args, parameterIndex)) {
                throw new Error("Missing required argument.");
            }
            let arg = args[parameterIndex];
            console.info(`ValidRequired function ... Class: ${className} ,fun: ${key} ,argindex: ${parameterIndex} ,arg: ${arg} validate param ok`);
        }

        let result = originalFun.apply(this, args);
        return result;
    }

    function validateParam(args: any[], parameterIndex: number): boolean {
        return parameterIndex >= args.length || args[parameterIndex] === undefined;
    }

    return descriptor;
}