// 無建構參數類別
class NoArgsconstructor {
    public getName(): string {
        return "Annie";
    }
};

// 有建構參數類別
class HasArgsconstructor {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
};

// 以類別當作參數傳遞
function factory<T>(type: { new (): T }): T {
    return new type();
};

// 以類別還有其建構參數當作參數傳遞
function factoryWithArg<T>(type: { new (name: string): T }, name: string) {
    return new type(name);
};

console.info('********** This is AdvancedGenerics.ts **********');
let noArgInstance = factory(NoArgsconstructor);
let hasArgInstance = factoryWithArg(HasArgsconstructor,'KB');
console.info(noArgInstance.getName());
console.info(hasArgInstance.getName());
console.info('****************************************');