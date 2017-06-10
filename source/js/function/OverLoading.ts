function showMessage(message: string): string;
function showMessage(message: number): string;
function showMessage(message: boolean): string;

//函數重載，也可以不需要預先定義上述三個函數。（請嘗試註解 .ts 上頁首三個函數的定義）
function showMessage(message: (string | number | boolean)): string {
    var result: string;
    switch (typeof message) {
        case 'string':
            result = `This type is string ... ${message}`;
            break;
        case 'number':
            result = `This type is number ... ${message}`;
            break;
        case 'boolean':
            result = `This type is boolean ... ${message}`;
            break;
        default:
            result = `Not catch type ... ${message}`;
    }
    return result;
};

console.info('********** This is OverLoading.ts **********');
console.info(showMessage('KB'));
console.info(showMessage(8));
console.info(showMessage(true));
console.info('****************************************');

/**
 * 特殊重載：同樣函數名稱以及參數數量但有不同回傳值的特殊定義
 * 注意：目前無實作
 */
interface OverLoading {
    createType(myType: 'boolean'): boolean;
    createType(myType: 'number'): number;
    createType(myType: 'string'): string;
    createType(myType: string): Object;
}