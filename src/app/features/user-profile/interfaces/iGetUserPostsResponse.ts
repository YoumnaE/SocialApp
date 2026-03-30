export interface iGetUserPostsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  total: number;
}

export interface Data {
  posts: Post[];
}

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment | TopComment2 | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface TopComment2 {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}

export interface TopComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}