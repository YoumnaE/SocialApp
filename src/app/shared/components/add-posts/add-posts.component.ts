import { FeedService } from './../../../features/feed/services/feed.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-posts',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
})
export class AddPostsComponent {
  private readonly fb= inject(FormBuilder);
  private readonly FeedService= inject(FeedService);
  @Output() sendAddedPostToParent= new EventEmitter()

  isLoading=false;
  addPostForm = this.fb.group({
    body:[''],
    image:[new File([],'')]
  });

  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!)
  imagePreview!:string
  onImageChange(event:Event):void{
    const element= (event.target as HTMLInputElement).files;
    if (element) {
      let file=element![0];
      this.addPostForm.patchValue({image:file})
      this.imagePreview= URL.createObjectURL(file);
    }
  }
  
  onAddPostSubmit():void{
    let userData=this.addPostForm.value as Record<string,any>
    const fd = new FormData()
    Object.keys(userData).forEach(key=>{
      if(userData[key]){
        fd.append(key, userData[key])
      }
    });
    this.isLoading=true;
    this.FeedService.addPosts(fd).subscribe({
      next:(response)=>{
        console.log(response)
        this.isLoading=false;
        this.imagePreview='';
        this.addPostForm.reset();
        this.sendAddedPostToParent.emit({
          ...response.data.post,
          user: this.userData
        })
      }
    })
  }
}
