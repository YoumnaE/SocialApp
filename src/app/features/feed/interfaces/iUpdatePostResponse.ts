import { Post } from "./iAllPostsResponse";

export interface IUpdatePostResponse {
  message: string;
  data: {
    post: Post;
  };
}