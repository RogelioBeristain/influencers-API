export interface InfluencerResponse {
    success: boolean;
    data:    ReqInfluencer[];
}

 interface ReqInfluencer {
    id:                number;
    social_network_id: number;
    category_id:       number;
    username:          string;
    full_name:         string;
    phone:             string;
    email:             string;
    followers_count:   number;
    following_count:   number;
    created_at:        Date;
    updated_at:        Date;
    category:          Category;
}

 interface Category {
    id:         number;
    name:       string;
    is_active:  number;
    created_at: null;
    updated_at: null;
}
