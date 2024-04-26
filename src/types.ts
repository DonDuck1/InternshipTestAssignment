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

type DataToMakeNewPost = { 
    email: string;
    likes: string;
    reposts: string;
    views: string;
}

type Error = {
    errorComponent: string;
    errorMessage: string;
}

type ErrorsFromMakingNewPost = {
    meta: MetaFromOwnApi;
    data: Error[];
};

export { PostFromYourSurpriseApi, PostFromOwnApi, netLikesOfPostFromOwnApi, PostsFromOwnApi, DataToMakeNewPost, Error, ErrorsFromMakingNewPost }