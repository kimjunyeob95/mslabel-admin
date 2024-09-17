export interface EstimateListType {
  total_records: number;
  last_page: number;
  records?: RecordsEntity[];
  page: number;
  page_size: number;
}
export interface RecordsEntity {
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
