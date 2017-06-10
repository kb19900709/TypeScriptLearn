// var，ES5標準的變數定義關鍵字
var testScope1 = (): void => {
    var toggle = true;
    if (toggle) {
        var result = 'yayaya';
    }
    console.info(result); // 編譯會過但是IDE可能會警告（變數提升）
};

// let為ES6中定義變數的新語法，let使得變數活動範圍限制在一個區塊內
var testScope2 = (): void => {
    var toggle = true;
    if (toggle) {
        let result = 'hahaha';
        console.info(result);
    }
    // console.info(result); // error
};

// const語法限制同let，差別在於不可以重新賦值
var testScope3 = (): void => {
    var toggle = true;
    if (toggle) {
        const result = 1;
        console.info(result);
        // result = 2; //error
    }
    // console.info(result); //error
};
console.info('********** This is VariableScope.ts **********');

// testScope1();
testScope2();
testScope3();


// Immediately Invoked Function Expression (IIFE)

/**
 * 使用 ts 的 class 語法編譯出來的 js 程式碼，並不會真正生成私有變數。
 * 也就是說 classScopeTest.myNumber 在瀏覽器還是可以正常取值。
 * 
 * 但在開發階段我們還是可以透過 ts 的特性知道某些屬性是不該被使用的。
 */
class ClassMemberVariableTest {
    private myNumber: number;
    constructor(myNumber: number) {
        this.myNumber = myNumber;
    }

    public getMyNumber(): number {
        return this.myNumber;
    }

    public setMyNumber(newNumber: number): void {
        this.myNumber = newNumber;
    }
}

var classScopeTest = new ClassMemberVariableTest(100);
console.info("***** This is class scope test *****");
console.info(classScopeTest.getMyNumber());
classScopeTest.setMyNumber(105);
console.info(classScopeTest.getMyNumber());
// console.info(classScopeTest.myNumber); // error

/**
 * 在一些特殊狀況必須隱藏私有變數，譬如說要做出一個函式庫給其他人使用時 ... 
 * 使用 IIFE，可避免變數提升導致的污染，也可以實作出真正的私有變數。
 */
var IIFEMemberVariableTest: any = (function () {
    var myNumber = 0;
    function IIFEMemberVariableTest() {
    };

    IIFEMemberVariableTest.prototype.getMyNumber = function () {
        return myNumber;
    };

    IIFEMemberVariableTest.prototype.setMyNumber = function (newNumber: number) {
        myNumber = newNumber;
    };

    return IIFEMemberVariableTest;
})();

var iifeScopetest = new IIFEMemberVariableTest();
console.info("***** This is iife scope test *****");
console.info(iifeScopetest.getMyNumber());
iifeScopetest.setMyNumber(105);
console.info(iifeScopetest.getMyNumber());
console.info(iifeScopetest.myNumber); //undefined

console.info('****************************************');