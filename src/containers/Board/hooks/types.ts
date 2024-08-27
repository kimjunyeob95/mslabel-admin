export interface MainMenuList {
  id: number;
  title: string;
  rank: number;
  sub_menus: SubMenusEntity[] | [];
}
export interface SubMenusEntity {
  id: number;
  title: string;
  type: string;
  rank: number;
}

export interface SubMenuList {
  result: ResultEntity[] | [];
  total_records: number;
  last_page: number;
  page: number;
  page_size: number;
}
export interface ResultEntity {
  id: number;
  sub_rank: number;
  main_title: string;
  sub_title: string;
  group_id: number;
  type: string;
}
