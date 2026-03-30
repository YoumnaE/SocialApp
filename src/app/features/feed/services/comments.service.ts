import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { iGetPostCommentsResponse } from '../interfaces/iGetPostCommentsResponse';
import { iAddCommentsResponse } from '../interfaces/iAddCommentsResponse';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly http = inject(HttpClient)
  getAllComments(postId:string,pageNumber=1){
    return this.http.get<iGetPostCommentsResponse>(`${App_Apis.comments.get(postId)}?page=${pageNumber}&limit=10`)
  }
  addComment(commentData:FormData,postId:string){
    return this.http.post<iAddCommentsResponse>(`${App_Apis.comments.add}/${postId}/comments`,commentData)
  }
  deleteComment(commentId:string,postId:string){
    return this.http.delete(`${App_Apis.comments.delete}/${postId}/comments/${commentId}`)
  }
}
