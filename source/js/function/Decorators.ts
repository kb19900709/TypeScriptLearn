import { Log } from "./decorators/Log";
import { Required, ValidRequired } from "./decorators/Required";

@Log
class People {
    @Log
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    @Log
    public getName(): string {
        return this.name;
    }

    @Log
    public getAge(): number {
        return this.age;
    }

    @Log
    @ValidRequired
    public codingWith(@Required language: string): string {
        return `${this.name} coding with ${language}`;
    }
}

let KB = new People('KB', 26);
console.info('This is KB info ... ' + JSON.stringify(KB));
// console.info(KB.getNewProperty()); //編譯器可能會警告但是可以正常取值 from @LogClass
KB.codingWith('TS');
KB.getAge();
KB.getName();