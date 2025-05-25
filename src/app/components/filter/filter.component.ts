import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Filter } from '../../Model/Filter';
import { CategoriesComponent } from "../categories/categories.component";
import { Category } from '../../Model/Category';
import { Book } from '../../Model/Book';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CategoriesComponent
],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent{

  filter: Filter = new Filter();
  categoryPage: Boolean = true;
  categoriesSelectedToShow: Category[] = [];
  book = new Book();
  books: Book[] = [];

  @Output() filterApplied = new EventEmitter<Filter>();
  
  applyFilters() {
    this.filterApplied.emit(this.filter);
  }

  clearFilters() {
    this.filter = new Filter();
    this.applyFilters();
  }

  onLanguageChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.filter.language.push(value);
    } else {
      this.filter.language = this.filter.language.filter(lang => lang !== value); 
    }
  }

  onBookCoverChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.filter.bookCover.push(value);
    } else {
      this.filter.bookCover = this.filter.bookCover.filter(cover => cover !== value);
    }
  }

  onCategoryChange(event: any){
    const value = event.target.value;
    if(event.target.checked){
      this.filter.category.push(value);
    } else{
      this.filter.category = this.filter.category.filter(cate => cate !== value);
    }
  }

  //Categorias
  updateSelectedCategories(categories: Category[]) {
    this.categoriesSelectedToShow = categories;
    this.filter.category = categories;
    console.log(
      'Categorias atualizadas: ' + JSON.stringify(categories, null, 2)
    );
  }
}
