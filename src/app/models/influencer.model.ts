import { CategoriesService } from '../services/categories.service';
import { SocialNetworksService } from '../services/social-networks.service';

export class InfluencerModel{


    public categoriesService: CategoriesService;
    public socialNetworksService: SocialNetworksService;
    categoryName:string;
    
    
    static jsonToInfluencer( obj: Object ){
            

        return new InfluencerModel(
            obj["social_network_id"],
            obj["category_id"],
            obj["id"],
            obj["username"],
            obj["full_name"],
            obj["phone"],
            obj["email"],
            obj["followers_count"],
            obj["following_count"]

        );

    };




    static influencerToJson( influencer: InfluencerModel ){
            
       return {
           
            "social_network_id": influencer.socialNetworkId,
            "category_id": influencer.categoryId,
            "username":influencer.userName,
            "full_name": influencer.fullName,
            "phone": influencer.phone,
            "email": influencer.email,
            "followers_count": influencer.followersCount,
            "following_count": influencer.followingCount,
          
          }
    

    };
    
    constructor(
    
        public socialNetworkId ?: number,
        public categoryId?:number,
        public id?:number,
        public userName?:string,
        public fullName?:string,
        public phone?:string,
        public email?:string,
        public followersCount?:number,
        public followingCount?:number,
       
        
        ){

    }
    getSocialIcon():string{
        
        const iconsSocial: Array<string>=["fab fa-facebook fa-3x","fab fa-instagram fa-3x","fab fa-tiktok fa-3x","fab fa-youtube fa-3x"];

        return iconsSocial[this.socialNetworkId-1];


    }


    getCategoriesIcon():string{
        //envelope
        const iconsCategory: Array<string>= ["fas fa-utensils ", "fas fa-satellite-dish","fas fa-shapes","fas fa-suitcase-rolling","fas fa-surprise","fas fa-tv"];


        return iconsCategory[this.categoryId-1];



    }


    getCategoryName():string{
        
        let categoryName:string;
        const categoriesNames: Array<string>=["Foodie","Telecommunications","Applications","Travel","Entertainment","Cinema and TV"];
            
        categoryName=categoriesNames[this.categoryId-1];
          
        return categoryName;

    }

    getSocialNetworkName(){

        let socialNetworkName:string;
        const socialNetworksNames: Array<string>=["Facebook","Instagram","Tik Tok","YouTube"];
        socialNetworkName=socialNetworksNames[this.socialNetworkId-1];
        return socialNetworkName;


        
    }

    

    
}