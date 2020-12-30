import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url='http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  
  getCategories(){
        
    const data:any=this.http.get(`${this.url}/categories`);
      
    return data;
    

  }
}
