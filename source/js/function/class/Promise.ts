import * as Q from "q";

export class MyPromise {

    private errorFlag = 0;

    private getPromiseA(): Promise<string> {
        return Q.Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if (this.errorFlag != 1) {
                    resolve('promiseA say yes');
                    return;
                }
                reject('PromiseA error!!!');
            }, 500);
        });
    }

    private getPromiseB(): Promise<string> {
        return Q.Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if (this.errorFlag != 2) {
                    resolve('promiseB say yes');
                    return;
                }
                reject('PromiseB error!!!');
            }, 500);
        });
    }

    private getPromiseC(): Promise<number> {
        return Q.Promise<number>((resolve, reject) => {
            setTimeout(() => {
                if (this.errorFlag != 3) {
                    resolve(123);
                    return;
                }
                reject('PromiseC error!!!');
            }, 500);
        });
    }

    private getPromiseD(passMessage: string): Promise<string> {
        return Q.Promise<string>((resolve) => {
            setTimeout(() => {
                let returnStr = `This is getPromiseD test ... pass message is ${passMessage}`;
                resolve(returnStr);
            }, 500);
        });
    }

    private errorHandler(msg: any): any {
        return msg;
    }

    /**
     * ES7 新特性 async / await
     * 但在 PhantomJS 上會得到『ReferenceError: Can't find variable: Promise』。
     * 應是當前 PhantomJS 尚未全面支援 es6 的特性
     * 
     * @see https://goo.gl/ZUnDGK
     */
    public async asyncFun(): Promise<string> {
        let aPromiseResult = await this.getPromiseA().catch(this.errorHandler);
        console.info(aPromiseResult);

        let bPromiseResult = await this.getPromiseB().catch(this.errorHandler);;
        console.info(bPromiseResult);

        let cPromiseResult = await this.getPromiseC().catch(this.errorHandler);;
        console.info(cPromiseResult);

        return 'asyncFun';
    }

    public qAllFunctionTest(): Promise<string> {
        return Q.all([this.getPromiseA(), this.getPromiseB()]).then((resultArray) => {
            let result1 = resultArray[0];
            let result2 = resultArray[1];
            return `${result1},${result2}`;
        });
    }

    // 將 getPromiseD 當作 getPromiseA 的依賴函數
    public passPromise(): Promise<string> {
        return this.getPromiseA().then(this.getPromiseD).then((endMessage) => {
            return endMessage;
        });
    }
}