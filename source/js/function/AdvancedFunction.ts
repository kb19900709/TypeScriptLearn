import { People } from './class/Animal';

// 一般函數
let myCallBack = function (): void {
    console.info('This is my call back');
};

// 接受參數為函數的高階函數
let myHigherFun = function (cb: () => void): void {
    console.info('This is my higher function');
    cb();
};

console.info('********** This is AdvancedFunction.ts **********');
myHigherFun(myCallBack);

let norman = new People('Normen', 31);
norman.showNameMessage();
norman.showNameMessageViaAnonymousFun();
norman.showNameMessageViaArrowFun();
console.info('****************************************');