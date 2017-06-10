import { People } from '../source/js/function/class/Animal';
import { MyPromise } from '../source/js/function/class/Promise';
import { ErrorDemo } from '../source/js/function/class/Error';

let expect = chai.expect;

describe('Mocha test example', () => {
    // // before() is invoked once before ALL tests
    // before(() => {
    //     console.info("before() invoked!");
    // });

    // // after() invoked once after ALL tests
    // after(() => {
    //     console.info("after() invoked!");
    // });

    // // beforeEach() is invoked once before EACH test
    // beforeEach(() => {
    //     console.info("beforeEach() invoked!");
    // });

    // // afterEach() is invoked once before EACH test
    // afterEach(() => {
    //     console.info("afterEach() invoked!");
    // });

    it('People KB age validate', () => {
        let KB = new People('KB', 27);
        expect(KB.getAge()).to.equals(27);
    });

    it('People KB name validate', () => {
        let KB = new People('KB', 27);
        expect(KB.getName()).to.be.a('string');
    });

    it('Error catch test', () => {
        let myError = () => {
            new ErrorDemo().getThrowError();
        };
        expect(myError).to.throw(Error);
    });
});

describe('Asnyc', () => {
    it('Promise test all', done => {
        let promiseTest = new MyPromise();
        promiseTest.qAllFunctionTest().then(success => {
            expect(success).to.equals('promiseA say yes,promiseB say yes');
            done();
        }).catch(error => {
            console.info(error);
            done();
        });
    });

    it('Promise test function pass', done => {
        let promiseTest = new MyPromise();
        promiseTest.passPromise().then(success => {
            expect(success).to.equals('This is getPromiseD test ... pass message is promiseA say yes');
            done();
        }).catch(error => {
            console.info(error);
            done();
        });
    });

    it('Promise test async function', done => {
        let promiseTest = new MyPromise();
        promiseTest.asyncFun().then(success => {
            expect(success).to.equals('asyncFun');
            done();
        }).catch(error => {
            console.info(error);
            done();
        });
    });
});