export interface CategoriesResponse {
    success: boolean;
    data:    Category[];
  }
  
export interface Category {
    id:         number;
    name:       string;
    is_active:  number;
    created_at: null;
    updated_at: null;
  }