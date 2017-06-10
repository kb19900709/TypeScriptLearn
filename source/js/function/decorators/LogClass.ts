/**
 * 類別級裝飾器
 * 接受建構子當作參數，回傳參數中的建構子或是新的建構子將取代被標注的類別的建構子
 * 回傳 undefined 等同直接回傳參數建構子
 * 
 * @param constructor 建構子
 */
export function LogClass<T extends { new (...args: any[]): {} }>(constructor: T): T {
    let constructorRecord = <any>constructor;
    console.info(`Log class: ${constructorRecord.name}`);
    return class extends constructor {
        private newProperty = "From Decorator";
        public getNewProperty(): string {
            return this.newProperty;
        }
    }
}