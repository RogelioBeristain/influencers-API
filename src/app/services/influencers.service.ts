import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ErrorResponse } from 'src/app/models/error.response';
import { ErrorModel } from '../models/error.model';
import { domainToASCII } from 'url';
import { InfluencerResponse, InfluencerModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class InfluencersService {
  private url = 'http://127.0.0.1:8000/api';



  constructor(private http: HttpClient) {

  }

  createInfluencer(influencer: InfluencerModel) {

    return this.http.post(`${this.url}/influencers`, InfluencerModel.influencerToJson(influencer));


  }


  updateInfluencer(influencer: InfluencerModel) {
    // influencer.phone= influencer.phone.replace(/\-/gi, "");
    return this.http.put(`${this.url}/influencers/${influencer.id}`, InfluencerModel.influencerToJson(influencer));
  }

  getInfluencers() {
    return this.http.get<InfluencerResponse>(`${this.url}/influencers`).pipe(
      map(resp => {

        return resp.data.map(influencer => {

          return InfluencerModel.jsonToInfluencer(influencer);

        });

      })
    );
  }

  getErrors(errores: ErrorResponse): string {


    return ErrorModel.errorJson(errores.errors).printErrors(errores);




  }

  getInfluencer(id: number) {

    return this.http.get<InfluencerResponse>(`${this.url}/influencers/${id}`).pipe(
      map(resp => {

        return resp.data;

      })
    );


  }

  deleteInfluencer(id: number) {

    const data: any = this.http.delete(`${this.url}/influencers/${id}`);

    return data;


  }


}
