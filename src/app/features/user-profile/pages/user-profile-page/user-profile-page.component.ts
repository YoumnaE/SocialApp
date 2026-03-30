import { User } from './../../../user-profile/interfaces/iGetUserProfileResponse';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { AllPostsComponent } from "../../../../shared/components/all-posts/all-posts.component";
import { Post } from '../../../feed/interfaces/iAllPostsResponse';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-profile-page',
  imports: [DatePipe, AllPostsComponent, RouterLink],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  private readonly userService= inject(UserService);

  isLoading=false;
  user!: User;
  userPosts:Post[] = [];

  ngOnInit(){
    const userData= JSON.parse(localStorage.getItem('userData')!)
    const userId = userData._id;
    this.isLoading=true;
    this.userService.getProfileData(userId).subscribe({
      next:response=>{
        this.isLoading=false;
        this.user = response.data.user;
        
      }
    })

    this.userService.getProfilePosts(userId).subscribe({
      next:response=>{
        this.userPosts = response.data.posts;
      }      
    })
  }

  removePost(postId: string) {
    this.userPosts = this.userPosts.filter(post => post._id !== postId);
  }
}
