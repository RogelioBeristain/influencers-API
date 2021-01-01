export class InfluencerModel{
    
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
        public followingCount?:number
        
        ){

    }

    
}