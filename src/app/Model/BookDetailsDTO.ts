export interface BookDetailsDTO{
  code: number;
  title: string;
  year: number;
  price: number;
  pages: number;
  language: string;
  bookCover: string;
  image: Uint8Array | null; 
  quantity: number;
  description: string;
  authorId: number;
  authorName: string;
  categories: string;
}