export interface BannerFilter {
  page: number;
  page_size: number;
  is_show: string;
  search_cls: string;
  keyword: string;
}

export interface TopBanner {
  total_records: number;
  last_page: number;
  records: RecordsEntity[] | [];
  page: number;
  page_size: number;
}
export interface RecordsEntity {
  id: number;
  title: string;
  user_id: string;
  img_url: string;
  is_show: string;
  is_always_show: string;
  show_started_at: string;
  show_ended_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  admin_user: AdminUser;
}
export interface AdminUser {
  user_id: string;
  user_name: string;
  email: string;
}

export interface Introduce {
  total_records: number;
  last_page: number;
  records: RecordsEntity[] | [];
  page: number;
  page_size: number;
}
export interface RecordsEntity {
  id: number;
  title: string;
  user_id: string;
  img_url: string;
  desc: string;
  is_show: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  admin_user: AdminUser;
}
export interface AdminUser {
  user_id: string;
  user_name: string;
  email: string;
}

export interface Introduce2 {
  total_records: number;
  last_page: number;
  records: Introduce2RecordsEntity[] | [];
  page: number;
  page_size: number;
}
export interface Introduce2RecordsEntity {
  id: number;
  title: string;
  user_id: string;
  img_url: string;
  is_show: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  admin_user: AdminUser;
}
