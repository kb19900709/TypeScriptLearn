import { Dog, People, Animal } from './class/Animal';

console.info('********** This is Generics.ts **********');
let peopleArray = genPeopleArray();
let dogArray = genDogArray();
printInfo<People>(peopleArray);
printInfo<Dog>(dogArray);
console.info('****************************************');

function genPeopleArray(): People[] {
    let result = new Array<People>();
    result.push(new People('KB', 27));
    result.push(new People('Rick', 29));
    result.push(new People('Pete', 30));
    return result;
};

function genDogArray(): Dog[] {
    let result = new Array<Dog>();
    result.push(new Dog('Pug', 2));
    result.push(new Dog('Labrador', 14));
    result.push(new Dog('Maltese', 7));
    return result;
};

// 依據 DRY 原則，在 typescript 中可以使用泛型簡化重複的動作
function printInfo<T extends Animal>(someArray: T[]): void {
    let currentObject;
    let name;
    let age;
    for (var i = 0; i < someArray.length; i++) {
        currentObject = someArray[i];
        name = currentObject.getName();
        age = currentObject.getAge();
        console.info(`This is ${name}，and age is ${age}`);
    }
};