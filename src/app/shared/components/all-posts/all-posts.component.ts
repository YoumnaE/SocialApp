import { CommentsService } from './../../../features/feed/services/comments.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../features/feed/interfaces/iAllPostsResponse';
import { DatePipe } from '@angular/common';
import { AllCommentsComponent } from "../comments/all-comments/all-comments.component";
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-all-posts',
  imports: [PostCardComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostsComponent {
  private readonly commentsService = inject(CommentsService)
  @Input() allPosts!: Post[];
  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<any>();


  getPostComments(postId:string):void{
    this.commentsService.getAllComments(postId).subscribe({
      next:response=>{
        console.log(response)
      }
    });
  }
  onPostDeleted(postId:string) {
  this.postDeleted.emit(postId);
}

  onPostUpdated(post: Post) {
    this.postUpdated.emit(post);
  }
}
