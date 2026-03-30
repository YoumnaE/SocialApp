import { CommentsService } from './../../../../features/feed/services/comments.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
private readonly fb= inject(FormBuilder);
  private readonly CommentsService= inject(CommentsService);

  @Input() postId!:string
  @Output() sendAddedCommentToParent= new EventEmitter()

  
  isLoading=false;
  addCommentsForm = this.fb.group({
    content:[''],
    image:[new File([],'')]
  });

  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!)
  imagePreview!:string
  onImageChange(event:Event):void{
    const element= (event.target as HTMLInputElement).files;
    if (element) {
      let file=element![0];
      this.addCommentsForm.patchValue({image:file})
      this.imagePreview= URL.createObjectURL(file);
    }
  }
  
  onAddCommentSubmit():void{
    let userData=this.addCommentsForm.value as Record<string,any>
    const fd = new FormData()
    Object.keys(userData).forEach(key=>{
      if(userData[key]){
        fd.append(key, userData[key])
      }
    });
    
    this.isLoading=true;
    this.CommentsService.addComment(fd,this.postId).subscribe({
      next:(response)=>{
        console.log(response)
        this.isLoading=false;
        this.imagePreview='';
        this.addCommentsForm.reset();
        this.sendAddedCommentToParent.emit({
          ...response.data.comments,
          user: this.userData
        })
      }
    })
  }
}