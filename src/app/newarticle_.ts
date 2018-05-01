export interface Article {
    id: number;
    id_user: number;
    title: string;
    text: string;
    categories: number[];
    pub_date: string;
    slug:string;
  }