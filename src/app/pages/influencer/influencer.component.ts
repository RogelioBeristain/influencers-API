import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';


import { InfluencerModel } from '../../models/influencer.model';
import { InfluencersService } from '../../services/influencers.service';


import Swal from 'sweetalert2'

@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})


export class InfluencerComponent implements OnInit {

  influencer = new InfluencerModel();


  constructor(private influencersService: InfluencersService, private route: ActivatedRoute, private router: Router) { 



  }

  ngOnInit(): void {

    const id:string= this.route.snapshot.paramMap.get('id');

    if ( id !=='new'){
        this.influencersService.getInfluencer(parseInt(id) ).subscribe(resp =>{
          console.log(resp);
          let data=resp['data'];
          this.influencer.phone=data.phone;
          this.influencer.email=data.email;
          this.influencer.fullName=data.full_name;
          this.influencer.categoryId=data.category_id;
          this.influencer.socialNetworkId=data.social_network_id;
          this.influencer.userName=data.username;
          this.influencer.followersCount=data.followers_count;
          this.influencer.followingCount=data.following_count;
          this.influencer.id=data.id
          
        });
    }
  }

  guardar(form: NgForm) {


    if (form.invalid) {
      alert('Formulario invalido');

    }
    
   
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    }
    );

    Swal.showLoading();


    let peticion: Observable<any>;



    if (this.influencer.id) {
      console.log("edit");
      peticion = this.influencersService.updateInfluencer(this.influencer);
    }
    else {
      console.log("create");
      peticion = this.influencersService.createInfluencer(this.influencer);
    }

    peticion.subscribe(
      resp => {
        console.log(resp);
        Swal.fire({
          title:this.influencer.userName,
          text:'Acción realizada correctamente',
          type:'success'
          
        });
        this.router.navigate(['/'])
        
      }
    )



  }

  borrar(id:number, influencer?: InfluencerModel){
    
    Swal.fire({
      title:"¿Esta seguro?",
      text:`Está seguro de que desea borrar a ${influencer.userName}`,
      type:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp=> {
          if(resp.value){

            this.influencersService.deleteInfluencer(id).subscribe(resp =>{
              console.log(resp);
        
              this.router.navigate(['/'])
              
            });
          }
    }) ;

   



  }



}
