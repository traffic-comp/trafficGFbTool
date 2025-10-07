export interface Page {
  access_token: string;
  category: string;
  category_list: CategortList[];
  id: number;
  tasks: string[];
  name: string;
}

export interface CategortList {
  id: number;
  name: string;
}

export interface FBFrom {
  id: number;
  locale: string;
  name: string;
  status: string;
}
