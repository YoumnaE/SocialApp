import { FeedService } from './../services/feed.service';
import { Component, inject } from '@angular/core';
import { FeedSideBarComponent } from "../components/feed-side-bar/feed-side-bar.component";
import { FeedSuggestedFriendsComponent } from "../components/feed-suggested-friends/feed-suggested-friends.component";
import { AddPostsComponent } from "../../../shared/components/add-posts/add-posts.component";
import { AllPostsComponent } from "../../../shared/components/all-posts/all-posts.component";
import { Post } from '../interfaces/iAllPostsResponse';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Suggestion } from '../interfaces/iGetFollowSuggestionsResponse';


@Component({
  selector: 'app-feed-page',
  imports: [FeedSideBarComponent, FeedSuggestedFriendsComponent, AddPostsComponent, AllPostsComponent, InfiniteScrollDirective],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
})
export class FeedPageComponent {
  private readonly FeedService=inject(FeedService)
  allPosts!:Post[]
  isLoading=false;
  currentPage=1;
  allFollowSuggestions!:Suggestion[]

  ngOnInit():void{
    this.getAllPosts();
    this.getFollowSuggestions();
  }
  getAllPosts():void{
    if(this.isLoading) return;

    this.isLoading=true;
    this.FeedService.getAllPosts(this.currentPage).subscribe({
      next:response=>{
        if(this.allPosts){
          this.allPosts.push(...response.data.posts)
        }else{
          this.allPosts= response.data.posts
        }
        this.isLoading=false;
      }
    })
  }

  removePost(postId: string) {
    this.allPosts = this.allPosts.filter(post => post._id !== postId);
  }
  getFollowSuggestions(){
    this.FeedService.getAllSuggestions().subscribe({
      next:(response) =>{
        this.allFollowSuggestions=response.data.suggestions;
      }
    })
  }

  onScroll(){
    ++this.currentPage
    this.getAllPosts();
  }
}
