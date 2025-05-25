import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../Model/Category';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.url;
  constructor(private http:HttpClient) { }


  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  selectCategory(category: string) {
    this.selectedCategorySource.next(category);
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url + "/category/all")
  }

}
