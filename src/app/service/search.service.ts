import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResultsSource = new Subject<any[]>();
  searchResults$ = this.searchResultsSource.asObservable();

  updateResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
}
