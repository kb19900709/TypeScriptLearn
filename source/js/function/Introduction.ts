// 函數聲明
function showMyName(name: string): string {
    if (name) {
        return 'My name is ' + name;
    }
    return '';
};

// 箭頭函數
var showMyAge = (): number => {
    return 27;
};

// 函數表達式
var showMySkill: (skill: string) => string;
showMySkill = function (skill: string): string {
    if (skill) {
        return 'I can do ' + skill;
    }
    return '';
};

console.info('********** This is Introduction.ts **********');
console.info(showMyName('KB'));
console.info('My age is ' + showMyAge());
console.info(showMySkill('TypeScript'));
console.info('****************************************');