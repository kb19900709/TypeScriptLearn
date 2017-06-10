import { DemoController } from '../source/js/controller/DemoController';

let expect = chai.expect;
let mySinon = sinon;

// When using a spy, the original function still runs, but when using a stub, it doesn’t.
describe('Sinon spy test', () => {

    let testTargetId = 'myComponent';

    before(() => {
        $('body').append(`<div id="${testTargetId}"/>`);
    });

    beforeEach(() => {
        $(`#${testTargetId}`).empty();
    });

    it('normal test', () => {
        let myController = new DemoController();
        myController.init(testTargetId);
        $('#name').val('KB');
        $('#birthday').val('07/09/1990');

        let onSubmitSpy = mySinon.spy(myController, 'onSubmit');
        $('#submitBtn').trigger('click');

        //Important final step - remove the spy
        onSubmitSpy.restore();

        expect(onSubmitSpy.called).to.equals(true);
        expect(onSubmitSpy.callCount).to.equals(1);
        expect($('#result').val()).to.equals('26');
    });
});

describe('Sinon stub test', () => {
    it('default return test1', () => {
        let myStub = mySinon.stub();
        myStub.withArgs('KB').returns(26);
        myStub.withArgs('Annie').returns(27);
        myStub.withArgs('Ted').throws('Error');

        expect(myStub('KB')).to.equals(26);
        expect(myStub('Annie')).to.equals(27);
        expect(() => {
            myStub('Ted')
        }).to.throw(Error);
    });

    it('default return test2', () => {
        let myStub = mySinon.stub();
        myStub.onCall(0).returns('first');
        myStub.onCall(1).returns('second');
        myStub.returns('ok'); // All following calls return ok

        expect(myStub()).to.equals('first');
        expect(myStub()).to.equals('second');
        expect(myStub()).to.equals('ok');
        expect(myStub()).to.equals('ok');
    });

    it('default return test3', () => {
        let myStub = mySinon.stub();
        myStub.withArgs(8)
            .onFirstCall().returns(1)
            .onSecondCall().returns(2);
        myStub.returns(0);
        expect(myStub(1)).to.equals(0);
        expect(myStub(8)).to.equals(1);
        expect(myStub(2)).to.equals(0);
        expect(myStub(8)).to.equals(2);
        expect(myStub(3)).to.equals(0);
        expect(myStub(8)).to.equals(0);
    });

    it('reset', () => {
        let myStub = mySinon.stub();
        myStub.returns(8);

        expect(myStub()).to.equals(8);

        myStub.resetBehavior();

        expect(myStub()).to.equals(undefined);


        myStub = mySinon.stub();
        myStub();
        expect(myStub.called).to.equals(true);
        myStub.resetHistory();
        expect(myStub.called).to.equals(false);
    });

    it('call fake', () => {
        let originalName = 'KB';
        let fakeName = 'Annie';

        class MyClass {
            private name: string;
            constructor(name: string) {
                this.name = name;
            }
            public getName(): string {
                return this.name;
            }
            public sum(a: number, b: number): number {
                return a + b;
            }
        }

        let testTarget = new MyClass(originalName);
        mySinon.stub(testTarget, 'getName').callsFake(() => {
            return fakeName;
        });

        expect(testTarget.getName()).to.equals(fakeName);
    });

    it('call fake function', () => {
        let myStub = mySinon.stub();
        myStub({
            'printAge': (): void => {
                console.info('in myStub printAge result: 26');
            }
            , 'printGender': (): void => {
                console.info('in myStub printGender result: man');
            }
            , 'printToday': (date: string): void => {
                console.info(`in myStub printToday result: ${date}`);
            }
        });

        myStub.yieldTo('printAge');
        myStub.yieldTo('printGender');
        myStub.yieldTo('printToday', new Date().toLocaleDateString());
    });
});

let server: sinon.SinonFakeServer;
describe('Sinon fake server and stub composite test', () => {
    before(() => {
        server = mySinon.fakeServer.create();
        server.autoRespond = true;
    });

    it('get fake response', done => {
        server.respondWith('POST'
            , '/user'
            , [200, { "Content-Type": "application/json" }, '[{"id":1,"name":"KB"},{"id":2,"name":"RONG"}]']
        );

        $.post('/user').then(response => {
            expect(response.length).to.equals(2);
            expect(response[0].name).to.equals('KB');
            done();
        });
    });
});