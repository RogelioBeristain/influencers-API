export class InfluencerModel{
    
    static influencerJson( obj: Object ){
            

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