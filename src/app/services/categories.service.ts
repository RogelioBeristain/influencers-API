import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoriesResponse } from '../models/categories.response';


@Injectable({
  providedIn: 'root'
})



export class CategoriesService {
  private url='http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  
  getCategories(){
        
    const data = this.http.get<CategoriesResponse>(`${this.url}/categories`).pipe(
      map(resp => {

        return resp.data;

      })
    );
      
    return data;
    

  }
}
