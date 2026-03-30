import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';
import { User } from '../../interfaces/iAuthResponse';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading=false;
  successMessage='';
  userData!:User
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  }
);
  constructor(){
    const userData = JSON.parse(localStorage.getItem(Stored_Keys.userData) !)
    if(userData){
      this.loginForm.get('email')?.setValue(userData.email)
    }
  }

  onLoginSubmit(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next:(response:any) => {
          console.log(response)
          localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
          
    localStorage.setItem(Stored_Keys.token, JSON.stringify(response.data.token))
          this.router.navigate(['/feed']);
          this.loginForm.reset();
        },
          error:(error: HttpErrorResponse)=>{
            console.log(error);
          }
      })
    }
  }
}