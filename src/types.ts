type PostFromYourSurpriseApi = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type PostFromOwnApi = {
    blog_id: number;
    user_id: number;
    post: string;
};

type MetaFromOwnApi = {
    name: string;
    title: string;
    date: string;
    originalUrl: string;
};

type netLikesOfPostFromOwnApi = {
    meta: MetaFromOwnApi;
    data: {
        "SUM(like)": number
    };
}

type PostsFromOwnApi = {
    meta: MetaFromOwnApi;
    data: PostFromOwnApi[];
};

export { PostFromYourSurpriseApi, PostFromOwnApi, netLikesOfPostFromOwnApi, PostsFromOwnApi}