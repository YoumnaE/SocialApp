import { CommentsService } from './../../../../features/feed/services/comments.service';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Comment } from '../../../../features/feed/interfaces/iGetPostCommentsResponse';

@Component({
  selector: 'app-all-comments',
  imports: [DatePipe],
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.css',
})
export class AllCommentsComponent {
  private readonly commentsService = inject(CommentsService);
  @Output() commentDeleted = new EventEmitter<string>();
  @Input() comment!:Comment

  userId:string='';
  ngOnInit():void{
    this.userId=JSON.parse(localStorage.getItem('userData')!)._id;
  }

  deleteCommentItem(commentId:string,postId:string){
    this.commentsService.deleteComment(commentId,postId).subscribe({
      next:response=>{
        console.log(response)
        this.commentDeleted.emit(commentId);
      }
    })
  }
}
