import { CommentsService } from './../../../features/feed/services/comments.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../features/feed/interfaces/iAllPostsResponse';
import { DatePipe } from '@angular/common';
import { AllCommentsComponent } from "../comments/all-comments/all-comments.component";
import { Comment } from '../../../features/feed/interfaces/iGetPostCommentsResponse';
import { AddCommentComponent } from "../comments/add-comment/add-comment.component";
import { FeedService } from '../../../features/feed/services/feed.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-card',
  imports: [DatePipe, AllCommentsComponent, AddCommentComponent, ReactiveFormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  private readonly commentsService = inject(CommentsService)
  private readonly feedService = inject(FeedService);
  private readonly fb= inject(FormBuilder);
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<any>();

  userId:string='';

  ngOnInit():void{
    this.userId=JSON.parse(localStorage.getItem('userData')!)._id;
  }

  selectedImage?: File;
  updateImagePreview: string = '';
  isLoading=false;
  updateModal=false;
  commentsLoading=false
  allComments!:Comment[];
  isShowTopComment=true;

  getPostComments(postId:string):void{
    if(this.commentsLoading){
      return;
    }

    this.commentsLoading=true;
    this.commentsService.getAllComments(postId).subscribe({
      next:response=>{
        this.commentsLoading=false;
        console.log(this.post.topComment)
        this.allComments=response.data.comments
        this.isShowTopComment=false;
      }
    });
  }

  deletePostItem(postId:string){
    this.feedService.deletePost(postId).subscribe({
      next:response=>{
        console.log(response)
        this.postDeleted.emit(postId);
      }
    })
  }

  updatePost(): void {
  const body = this.updatePostForm.get('body')?.value;

  // don't update if nothing changed
  if (!body && !this.selectedImage) return;

  const fd = new FormData();
  if (body) fd.append('body', body);
  if (this.selectedImage) fd.append('image', this.selectedImage);

  this.isLoading = true;

  this.feedService.updatePost(this.post._id, fd).subscribe({
    next: (response) => {
      this.isLoading = false;
      this.updateModal = false;

      this.updatePostForm.reset();
      this.updateImagePreview = '';
      this.selectedImage = undefined;

      this.postUpdated.emit({
        ...response.data.post,
        user: this.post.user
      });
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

  updatePostForm = this.fb.group({
    body:['']
  });

  onImageChange(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedImage = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.updateImagePreview = reader.result as string; 
  };
  reader.readAsDataURL(file);
}

openUpdateModal() {
  this.updatePostForm.patchValue({ body: this.post.body });
  this.updateImagePreview = this.post.image || '';
  this.selectedImage = undefined;
  this.updateModal = true;
}

removeComment(commentId: string) {
    this.allComments = this.allComments.filter(comment => comment._id !== commentId);
  }
}
