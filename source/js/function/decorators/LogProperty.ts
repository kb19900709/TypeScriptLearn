/**
 * 屬性級別裝飾器
 * 不需要回傳任何值
 * 
 * @param target Object.prototype
 * @param key Field name
 */
export function LogProperty(target: any, key: string): void {
    const className = target.constructor.name;
    let currentValue = target[key];

    let getter = () => {
        console.info(`Log property get ... Class: ${className} ,field: ${key} ,value: ${currentValue}`);
        return currentValue;
    }

    let setter = val => {
        currentValue = val;
        console.info(`Log property set ... Class: ${className} ,field: ${key} ,value: ${currentValue}`);
    }

    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}