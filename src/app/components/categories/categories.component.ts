import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../Model/Category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  constructor(private service:CategoryService){}

  @Output() choosedCategories = new EventEmitter<Category[]>();
  @Input() selected: Category[] = [];
  category:Category = new Category();
  categories:Category[] = [];
  selectedCategories:Category[] = [];

  getCategories():void{
    this.service.getAllCategories().subscribe(data => {
      this.categories = data;

      this.selectedCategories = this.categories.filter(c => 
        Array.isArray(this.selected) && this.selected.some(sel => sel.category === c.category)
      );

      this.choosedCategories.emit(this.selectedCategories);
    })
  }
  //Verifica se a categoria está sendo selecionada
  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.some(sc => sc.category === category.category);
  }
  //Quando a categoria for selecionada ele pega o resultado do input
  //e adiciona no array de selectedCategories
  //e depois da um emit no result
  onCategoryChange(event: Event,category: Category) {
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
      if (!this.selectedCategories.some(sc => sc.category === category.category)) {
        this.selectedCategories.push(category);
      }
    }else{
      this.selectedCategories = this.selectedCategories.filter(c => c.category !== category.category);
    }

    this.choosedCategories.emit(this.selectedCategories);
  }


  ngOnInit(): void {
      this.getCategories();
  }
  
}
