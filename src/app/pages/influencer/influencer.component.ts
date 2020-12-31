import { Component, OnInit } from '@angular/core';
import { NgForm ,Validators} from '@angular/forms';
import { from, Observable } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { InfluencerModel } from '../../models/influencer.model';
import { InfluencersService } from '../../services/influencers.service';
import { CategoriesService } from '../../services/categories.service';
import { SocialnetworksService } from '../../services/socialnetworks.service';
import Swal from 'sweetalert2'
import { ErrorResponse } from 'src/app/models/error.response';
import { ErrorModel } from '../../models/error.model';

@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})


export class InfluencerComponent implements OnInit {

  influencer = new InfluencerModel();
  
  categoriesData : any; 
  socialNetworksData : any; 
  
  constructor(private influencersService: InfluencersService,private categoriesService: CategoriesService,private socialnetworksService: SocialnetworksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id:string= this.route.snapshot.paramMap.get('id');
    this.influencer.categoryId=-1;
    this.influencer.socialNetworkId=-1;
   
    
    this.categoriesService.getCategories().subscribe(
              categories =>{
                    console.log(categories);
                    this.categoriesData=categories.data;
                  
              }
    ); 

    this.socialnetworksService.getNets().subscribe(
              nets =>{
                    console.log(nets);
                    this.socialNetworksData=nets.data;
              }
    ); 

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

    console.log(form);
    if (form.invalid) {
    
      Swal.fire({
        title: 'Espere',
        text: 'Ocurrio un error',
        type: 'error',
        allowOutsideClick: true
      }
      );
    
      Object.values( form.controls).forEach(control => {
          control.markAsTouched();
      } )

  
   
    }else{


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
         
          Swal.fire({
            title:this.influencer.userName,
            text:'Acción realizada correctamente',
            type:'success'
            
          });
          this.router.navigate(['/'])
          
        },

        err => { 

          
          let errores :ErrorResponse =  err.error;
          
        
         let cadenaErrores:string = this.influencersService.getErrors(errores);

          

        
        Swal.fire({
          title:this.influencer.userName,
          text:cadenaErrores,
          type:'error'
          
        });
      } 
      )

    }
    
   



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
