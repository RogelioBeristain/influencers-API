import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfluencerModel } from '../models/influencer.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InfluencersService {
  private url='http://127.0.0.1:8000/api';



  constructor(private http: HttpClient) { 
    
  }

  createInfluencer(influencer: InfluencerModel){
    influencer.phone= influencer.phone.replace(/\-/gi, "");
    let data:object={ 
      "social_network_id": influencer.socialNetworkId,
      "category_id": influencer.categoryId,
      "username":influencer.userName,
      "full_name": influencer.fullName,
      "phone": influencer.phone,
      "email": influencer.email,
      "followers_count": influencer.followersCount,
      "following_count": influencer.followingCount,
    
    };
    return this.http.post(`${this.url}/influencers`, data);
    

  }


  updateInfluencer(influencer: InfluencerModel){
    influencer.phone= influencer.phone.replace(/\-/gi, "");
    let data:object={ 
      "social_network_id": influencer.socialNetworkId,
      "category_id": influencer.categoryId,
      "username":influencer.userName,
      "full_name": influencer.fullName,
      "phone": influencer.phone,
      "email": influencer.email,
      "followers_count": influencer.followersCount,
      "following_count": influencer.followingCount,
    
    };
    return this.http.put(`${this.url}/influencers/${influencer.id}`, data);
    

  }

  getInfluencers(){
        
    const data:any=this.http.get(`${this.url}/influencers`);
          



    return data;
    

  }

  getInfluencer( id:number ){
        
    const data:any=this.http.get(`${this.url}/influencers/${id}`);
          
    return data;
    

  }

  deleteInfluencer( id:number ){
        
    const data:any=this.http.delete(`${this.url}/influencers/${id}`);
          
    return data;
    

  }

/*   private crearArreglo( influencerObj: object){
        const influencer: InfluencerModel[]=[];

        Object
        return "aa";
  } */
}
