

export class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public price: string,
        public image: string,
        public readonly type: string,
     
    ){}
}