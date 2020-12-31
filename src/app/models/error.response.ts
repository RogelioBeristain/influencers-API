export interface ErrorResponse {
    message: string;
    errors:  ReqErrors;
}

export interface ReqErrors {
    social_network_id: string[];
    category_id:       string[];
    username:          string[];
    full_name:         string[];
    phone:             string[];
    email:             string[];
    followers_count:   string[];
    following_count:   string[];
}