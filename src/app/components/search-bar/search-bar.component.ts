import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Book } from '../../Model/Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() resultSearch = new EventEmitter<Book[]>();
  
  constructor(private service:SearchService){}

  term:string = "";
  books:Book[] = [];
  authorTerm:string = "";

  searchByTitle(query:String):void{
    this.books = [];
    this.service.getBooksByTitle(query.toLowerCase()).subscribe(
      (data) => {
        this.books = data;
        
        console.log(this.books);
        this.resultSearch.emit(this.books);
        this.term = "";
      }
    )
  }

  searchByAuthor(query:String):void{
    this.books = [];
    this.service.getBooksByAuthor(query.toLowerCase()).subscribe(
      (data) => {
        this.books = data;
        
        console.log(this.books);
        this.resultSearch.emit(this.books);
        this.authorTerm = "";
      }
    )
  }
  
}
