import { UserService } from './../../../user-profile/services/user.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly userService = inject(UserService)

  passwordChanged=false;
  passwordForm = new FormGroup({
  password: new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  }),
    newPassword: new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ]
  })
});

  onPasswordSubmit(){
    this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid){
      const body = this.passwordForm.getRawValue();
      this.userService.changePassword(body).subscribe({
        next:(response:any) => {
          this.passwordChanged=true;
          console.log(response)
          this.passwordForm.reset();
        }
        
      })
      this.passwordChanged=false;
    }
  }
}
