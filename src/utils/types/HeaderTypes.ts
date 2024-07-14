export interface HeaderItem {
  id: number;
  title: string;
  rank: number;
  sub_menus?: SubMenusEntity[];
}
export interface SubMenusEntity {
  id: number;
  title: string;
  type: string;
  rank: number;
}
