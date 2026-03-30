export interface iAllPostsResponse {
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
  nextPage: number;
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
  sharedPost: SharedPost | SharedPost2 | SharedPost3 | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment2 | TopComment22 | TopComment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface TopComment22 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}

export interface TopComment2 {
  _id: string;
  content: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

export interface SharedPost3 {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
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

export interface SharedPost2 {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface SharedPost {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}