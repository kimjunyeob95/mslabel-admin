export interface BasicLabelListType {
  total_records: number;
  last_page: number;
  records: RecordsEntity[] | [];
  page: number;
  page_size: number;
}
export interface RecordsEntity {
  id: number;
  group_id: number;
  sub_id: number;
  user_id: string;
  title: string;
  is_show: string;
  desc: string;
  main_img: string;
  bottom_img1: string;
  bottom_img2: string;
  bottom_img3: string;
  bottom_img4: string;
  bottom_img5: string;
  material: string;
  size: string;
  shape: string;
  keywords: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}
