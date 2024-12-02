export class Book{

    code:number = 0;
    title:string = "";
    author:string = "";
    year:number = 0;
    price:number = 0;
    pages:number = 0;
    language:string = "";
    bookCover:string = "";
    image: string | ArrayBuffer | null = null;
    quantity: number = 0;
    description: string = "";
    categories: string[];

    constructor(){
        this.categories = [];
    }
}