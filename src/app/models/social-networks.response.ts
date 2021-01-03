export interface SocialNetworksResponse {
    success: boolean;
    data:    SocialNetwork[];
}

export interface SocialNetwork {
    id:         number;
    name:       string;
    is_active:  number;
    created_at: null;
    updated_at: null;
}