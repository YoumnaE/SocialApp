import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { iGetUserProfileResponse, User } from '../interfaces/iGetUserProfileResponse';
import { iGetUserPostsResponse } from '../interfaces/iGetUserPostsResponse';
import { iAllPostsResponse } from '../../feed/interfaces/iAllPostsResponse';
import { environment } from '../../../../environments/environment.development';
import { ChangePassword } from '../interfaces/iChangePassword';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  getProfileData(userId:string){
    return this.http.get<iGetUserProfileResponse>(`${App_Apis.user.get}/${userId}/profile`)
  } 
  getProfilePosts(userId:string){
    return this.http.get<iAllPostsResponse>(`${App_Apis.user.get}/${userId}/posts`)
  }
  changePassword(body:ChangePassword){
    return this.http.patch(`${App_Apis.user.get}/change-password`, body)
  }
}
