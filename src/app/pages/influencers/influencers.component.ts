import { Component, OnInit,Input } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfluencersService } from '../../services/influencers.service';
import { InfluencerModel } from '../../models/influencer.model';
import { InfluencerResponse } from '../../models/influcencer.response';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit {
   
    influencers: InfluencerModel[];
    cargando =false;


  constructor(private influencersService: InfluencersService ,private modalService: NgbModal) {}

  ngOnInit(){
    this.cargando=true;

    this.influencersService.getInfluencers().subscribe( resp  => {
     
        this.influencers=resp;
      /*   this.influencers=resp; */

      this.cargando=false;
      });


  }

  showPhone(influencer:InfluencerModel){

     
      Swal.fire({
        title: influencer.phone,
     
        type: 'info',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText:
    'Copiar <i class="far fa-copy"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
      }).then(resp => {
        if (resp.value) {

        
       
        }else{
          this.copyText(influencer.phone);
       
        }



    

    })

  }

  showEmail(influencer:InfluencerModel){

    Swal.fire({
      title: influencer.email,
   
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText:
      'Copiar <i class="far fa-copy"></i>',
    cancelButtonAriaLabel: 'Thumbs up, great!'
    }).then(resp => {
      if (resp.value) {

      
      
      
     
      }else{

        this.copyText(influencer.email);
      }



  

  })


}


copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
