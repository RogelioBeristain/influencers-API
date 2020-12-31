import { ErrorResponse } from './error.response';
export class ErrorModel{
    
    static errorJson( obj: Object ){
            
        
        return new ErrorModel(
            obj["social_network_id"],
            obj["category_id"],
            obj["username"],
            obj["full_name"],
            obj["phone"],
            obj["email"],
            obj["followers_count"],
            obj["following_count"],

        );

    };
    
    constructor(
        
        public social_network_id: string[],
        public category_id:       string[],
        public username:          string[],
        public full_name:         string[],
        public phone:             string[],
        public email:             string[],
        public followers_count:   string[],
        public following_count:   string[],
        ){

    }


    printErrors (errores :ErrorResponse):string{



        let campos:Array<string>=[
            "social_network_id",
            "category_id",
            "username",
            "full_name",
            "phone",
            "email",
            "followers_count",
            "following_count",
          ];
          let cadenaErrores:string="";
          
          campos.forEach( campo=>{
            if(errores["errors"][campo]){

              errores["errors"][campo].forEach(element => {
                cadenaErrores+=`${element} \n`;
            })
             
              }
              
          }
          
          );

          console.log(cadenaErrores);

          return cadenaErrores;
    }

    
}