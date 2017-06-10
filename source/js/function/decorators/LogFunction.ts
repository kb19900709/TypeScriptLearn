/**
 * 函數級別裝飾器
 * 回傳參數中的屬性描述物件或是新的屬性描述物件將取代被標注的函數的屬性描述物件
 * 回傳 undefined 等同直接回傳參數屬性描述物件
 * 
 * @param target Object.prototype
 * @param key Function name
 * @param descriptor Property desc
 */
export function LogFunction(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    let originalFun: Function = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        const className = target.constructor.name;

        let logArgs = args.map(element => {
            return JSON.stringify(element);
        }).join(',');

        if (isNoArgs(logArgs)) {
            logArgs = 'noArgs';
        }

        let result = originalFun.apply(this, args);
        console.info(`Log function ... Class: ${className} ,fun: ${key} ,args: ${logArgs} ,result: ${result}`);
        return result;
    }

    function isNoArgs(args: string): boolean {
        return args == undefined || args == null || args == '' ;
    }
    return descriptor;
}