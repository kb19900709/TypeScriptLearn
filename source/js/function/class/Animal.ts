/**
 * @see https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 */
export abstract class Animal {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public showNameMessage(): void {
        console.info(`Hi，I'm ${this.name} in normal function。`);
    }

    /**
     * 函數中使用 setTimeout，關鍵字 this 會因為在不同狀況下指向不同值，IDE可能會警告
     */
    public showNameMessageViaAnonymousFun(): void {
        setTimeout(function () {
            console.info(`Hi，I'm ${this.name} in native function。`);
        }, 1000);
    }

    /**
     * 函數中使用 setTimeout，箭頭函數（arrow function）在 typescript 則會綁定 this
     */
    public showNameMessageViaArrowFun(): void {
        setTimeout((): void => {
            console.info(`Hi，I'm ${this.name} in arrow function。`);
        }, 1000);
    }
}

export class People extends Animal { }
export class Dog extends Animal { }