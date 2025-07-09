import { Book } from "./Book";
import { User } from "./User"

export interface WishList{
    id: number | undefined;
    user: User;
    book: Book;
} 