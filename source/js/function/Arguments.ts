// 一般型函數宣告
var sum1 = (a: number, b: number, c: number): number => {
    return a + b + c;
};

// 可選型參數函數宣告，可選部分必須置於參數尾
var sum2 = (a: number, b: number, c?: number): number => {
    var result:number = a + b;
    if (c !== undefined) {
        result += c;
    }
    return result;
};

// 預設型參數函數宣告，預設部分必須置於參數尾
var sum3 = (a: number, b: number, c: number = 0): number => {
    return a + b + c;
};

// 無限制參數型函數
var sum4 = (...numberArgs: number[]): number => {
    var result = 0;
    for (var i = 0; i < numberArgs.length; i++) {
        result += numberArgs[i];
    }
    return result;
};

console.info('********** This is Arguments.ts **********');

console.info('sum1 = ' + sum1(1, 2, 3));

console.info('sum2：2 args = ' + sum2(1, 2));
console.info('sum2：3 args = ' + sum2(1, 2, 3));

console.info('sum3：2 args = ' + sum3(1, 2));
console.info('sum3：3 args = ' + sum3(1, 2, 3));

console.info('sum4：2 args = ' + sum4(1, 2));
console.info('sum4：3 args = ' + sum4(1, 2, 3));

console.info('****************************************');