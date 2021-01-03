import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InfluencerModel } from '../../models/influencer.model';
import { InfluencersService } from '../../services/influencers.service';
import { CategoriesService } from '../../services/categories.service';
import { SocialNetworksService } from '../../services/social-networks.service';
import Swal from 'sweetalert2'
import { ErrorResponse } from 'src/app/models/error.response';

import {  Category } from '../../models/categories.response';

@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})


export class InfluencerComponent implements OnInit {

  influencer = new InfluencerModel();

  categoriesData:Category[];
  socialNetworksData: any;

  constructor(private influencersService: InfluencersService, private categoriesService: CategoriesService, private socialNetworksService: SocialNetworksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id: string = this.route.snapshot.paramMap.get('id');
    this.influencer.categoryId = -1;
    this.influencer.socialNetworkId = -1;


    this.categoriesService.getCategories().subscribe(
      categories => {
        console.log(categories);
        this.categoriesData = categories;
      
      },
      err => {

        let errores: ErrorResponse = err.error;
        let cadenaErrores: string = this.influencersService.getErrors(errores);
        Swal.fire({
          title: "",
          text: cadenaErrores,
          type: 'error'

        });
      }
    );

    this.socialNetworksService.getSocialNetworks().subscribe(
      nets => {
      
        this.socialNetworksData = nets.data;
      },
      err => {

        let errores: ErrorResponse = err.error;
        let cadenaErrores: string = this.influencersService.getErrors(errores);
        Swal.fire({
          title: "",
          text: cadenaErrores,
          type: 'error'

        });
      }
    );

    if (id !== 'new') {
      this.influencersService.getInfluencer(parseInt(id)).subscribe(resp => {
        console.log(resp);
        this.influencer = InfluencerModel.jsonToInfluencer(resp);

      },
      err => {

        let errores: ErrorResponse = err.error;
        let cadenaErrores: string = this.influencersService.getErrors(errores);
        Swal.fire({
          title: this.influencer.userName,
          text: cadenaErrores,
          type: 'error'

        });
      }
      );

    }
  }

  guardar(form: NgForm) {

    console.log(form);
    if (form.invalid) {

      Swal.fire({ title: 'Espere', text: 'Ocurrio un error', type: 'error', allowOutsideClick: true});

      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })



    } else {


      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        type: 'info',
        allowOutsideClick: false
      }
      );

      Swal.showLoading();


      let peticion: Observable<any>;



      if (!this.influencer.id) {
        //console.log("edit");
        peticion = this.influencersService.createInfluencer(this.influencer);

        peticion.subscribe(
          resp => {
  
            Swal.fire({  text: 'Acción realizada correctamente', type: 'success' });
  
            Swal.fire({
              title: "¿Deseas crear un nuevo enfluencer?",
              text: ``,
              type: 'question',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Si!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText:
              'No, ir a la lista de influencers <i class="far fa-times-circle"></i>',
            cancelButtonAriaLabel: 'Thumbs up, great!'
            
            }).then(resp => {
              if (resp.value) {
  
                this.cleanData(form);
        
             
              }else{
  
                this.router.navigate(['/']);
              }
  
  
  
          
  
          })},
  
          err => {
  
            let errores: ErrorResponse = err.error;
            let cadenaErrores: string = this.influencersService.getErrors(errores);
            Swal.fire({
              title: this.influencer.userName,
              text: cadenaErrores,
              type: 'error'
  
            });
          }
        )

      }
      else {
        //console.log("create");
        peticion = this.influencersService.updateInfluencer(this.influencer);

        peticion.subscribe(
          resp => {
  
            Swal.fire({  text: 'Acción realizada correctamente', type: 'success' });
  
            Swal.fire({
              title: "¿Deseas seguir editando al influencer?",
              text: ``,
              type: 'question',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Si!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                        'No, ir a la lista de influencers <i class="far fa-times-circle"></i>',
                      cancelButtonAriaLabel: 'Thumbs up, great!'
            }).then(resp => {
              if (resp.value) {
  
              /*   this.cleanData(form); */
        
             
              }else{
  
                this.router.navigate(['/']);
              }
  
  
  
          
  
          })},
  
          err => {
  
            let errores: ErrorResponse = err.error;
            let cadenaErrores: string = this.influencersService.getErrors(errores);
            Swal.fire({
              title: this.influencer.userName,
              text: cadenaErrores,
              type: 'error'
  
            });
          }
        )
      }


   

    }





  }
  
  cleanData(form:NgForm){

    this.influencer=new InfluencerModel();
    Object.values(form.controls).forEach(control => {
     control.markAsUntouched();
   })
  }

  borrar(id: number, influencer?: InfluencerModel) {

    Swal.fire({
      title: "¿Esta seguro?",
      text: `Está seguro de que desea borrar a ${influencer.userName}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {

        this.influencersService.deleteInfluencer(id).subscribe(resp => {

          Swal.fire({ title: this.influencer.userName, text: 'Acción realizada correctamente', type: 'success' });
          
          this.router.navigate(['/'])
        },
        err => {

          let errores: ErrorResponse = err.error;
          let cadenaErrores: string = this.influencersService.getErrors(errores);
          Swal.fire({
            title: this.influencer.userName,
            text: cadenaErrores,
            type: 'error'

          });
        }
        
        );
      }
    });





  }



}
