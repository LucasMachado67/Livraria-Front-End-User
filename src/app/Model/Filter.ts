export class Filter{
    price: { min: number, max: number } | null = null;
    language: string[] = [];
    bookCover: string[] = [];
    category: string[] = [];
}