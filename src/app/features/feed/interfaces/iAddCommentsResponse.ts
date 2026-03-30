export interface CommentCreator{
    _id:string;
    name:string;
    username: string;
    photo:string;
    followersCount:number;
    followingCount:number;
    bookmarksCount:number;
    id:number;
}

export interface Comment{
    _id:string;
    content:string;
    commentCreator: CommentCreator;
    post:string;
    image:string;
    parentComment?:any;
    likes:any[];
    createdAt:string;
    likesCount:number;
    isReply:boolean;
    id:string;
}

export interface Data{
    comments: Comment;
}

export interface iAddCommentsResponse{
    success:boolean;
    message:string;
    data:Data;
}