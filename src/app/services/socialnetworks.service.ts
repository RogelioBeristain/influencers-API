import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialnetworksService {

  private url='http://127.0.0.1:8000/api';



  constructor(private http: HttpClient) { 
    
  }


  getNets(){
        
    const data:any=this.http.get(`${this.url}/social-networks`);
      
    return data;
    

  }
}
