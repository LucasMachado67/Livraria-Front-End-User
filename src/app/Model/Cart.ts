import { Book } from "./Book";
import { User } from "./User";

export interface Cart{
    id:number | undefined;
    user:User;
    book:Book;
    quantitySelected: number;
}