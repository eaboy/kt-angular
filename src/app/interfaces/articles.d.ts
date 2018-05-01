
export declare interface Article {
    id_article?: number,
    id_user: number,
    pub_date: string,
    status: Status,
    image: string,
    video: string,
    title: string,
    text: string,
    id_reply?: number,
    categories?: [string],
    slug?: string
}

type Status = 'finalizado' | 'borrador';
