
export declare interface User {
    username?: string,
    first_name: string,
    last_name: string,
    email: string,
    emailOfuscado?: string,
    password?: string,
    id_user?: number,
    image?: string,
    instagram_user?: string,
    twitter_user?: string,
    facebook_user ?: string,
    about_me?: string
}

export declare interface Login {
    user: string,
    password: string
}
