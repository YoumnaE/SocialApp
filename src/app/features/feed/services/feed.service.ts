import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { iAllPostsResponse, Post } from '../interfaces/iAllPostsResponse';
import { iAddPostResponse } from '../interfaces/iAddPostsResponse';
import { iGetFollowSuggestionsResponse } from '../interfaces/iGetFollowSuggestionsResponse';
import { IUpdatePostResponse } from '../interfaces/iUpdatePostResponse';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly http = inject(HttpClient)
  getAllPosts(pageNumber=1){
    return this.http.get<iAllPostsResponse>(`${App_Apis.posts.get}?limit=10&page=${pageNumber}`, )
  }

  addPosts(postData: FormData){
    return this.http.post<iAddPostResponse>(App_Apis.posts.add, postData)
  }

  deletePost(postId:string){
    return this.http.delete(`${App_Apis.posts.delete}/${postId}`)
  }

  updatePost(postId:string, data:FormData){
    return this.http.put<IUpdatePostResponse>(`${App_Apis.posts.add}/${postId}`, data)
  }

  getAllSuggestions(){
    return this.http.get<iGetFollowSuggestionsResponse>(App_Apis.suggestions.get)
  }

  toggleFollowers(userId:string){
    return this.http.put<iToggleFollowUserResponse>(`${App_Apis.suggestions.toggleFollowers}/${userId}/follow`,{})
  }
}
