import { LogFunction } from "./LogFunction";
import { LogClass } from "./LogClass";
import { LogProperty } from "./LogProperty";

/**
 * Log decorators factory function
 * 
 * @param args 
 * @see https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Decorators.html
 */
export function Log(...args: any[]) {
    let argsLength = args.length;
    switch (argsLength) {
        case 1:
            return LogClass.apply(this, args);
        case 3:
            if (args[2] !== undefined) {
                return LogFunction.apply(this, args);
            } else {
                return LogProperty.apply(this, args);
            }
        default:
            throw new Error('Log Not support');
    }
}