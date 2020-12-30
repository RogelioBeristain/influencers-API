import { Component, OnInit,Input } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfluencersService } from '../../services/influencers.service';
import { InfluencerModel } from '../../models/influencer.model';



@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit {
   
    influencers: Array<object>=[];
    

  constructor(private influencersService: InfluencersService ,private modalService: NgbModal) {}

  ngOnInit(){

    this.influencersService.getInfluencers()
      .subscribe(resp=> {
        console.log(resp["data"]);
        this.influencers=resp["data"];
      /*   this.influencers=resp; */
      });


  }

  ver(influencer:object) {
   
     alert("ver"); 
  }

  editar(influencer:object) {
    alert("edia"); 
    
    
  }

  eliminar(influencer:object) {
    alert("eliminar"); 
    
  }

}
