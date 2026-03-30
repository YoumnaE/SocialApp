import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Suggestion } from '../../interfaces/iGetFollowSuggestionsResponse';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed-suggested-friends',
  imports: [],
  templateUrl: './feed-suggested-friends.component.html',
  styleUrl: './feed-suggested-friends.component.css',
})
export class FeedSuggestedFriendsComponent {
  private readonly feedService= inject(FeedService)

  isFollowed=false;
  isLoading=false;
  mutualFollowerCount=5;
  @Input() suggestion!:Suggestion
  @Output() refreshView = new EventEmitter();

  followUser(userId:string):void{
    this.isLoading=true;
    this.feedService.toggleFollowers(userId).subscribe({
      next:response=>{
        this.isLoading=false;
        this.isFollowed=true;
        this.suggestion.followersCount=response.data.followersCount;
        this.refreshView.emit();
      }
    })
  }
}
