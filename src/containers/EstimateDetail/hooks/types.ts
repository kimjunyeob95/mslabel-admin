export interface EstimateDetailType {
  id: number;
  group_id: number;
  sub_id: number;
  user_id: string;
  company: string;
  title: string;
  is_reply: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  password: string;
  size: string;
  purpose: string;
  material: string;
  shape: string;
  quantity: string;
  desc: string;
  etc_file: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  categories?: CategoriesEntity[];
  admin_user: AdminUser;
  replies?: null[];
}

export interface CategoriesEntity {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  pivot: Pivot;
}

export interface Pivot {
  board_id: number;
  category_id: number;
}

export interface AdminUser {
  user_id: string;
  email: string;
  user_name: string;
}
