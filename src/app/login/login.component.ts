import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { User } from '../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm1: FormGroup;

  constructor(private fb: FormBuilder, private loginService: SignupService, private router: Router) { }

  ngOnInit() {

    this.myForm1 = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)]],
    });

  }

  loginFunc() {
    this.loginService.loginUser(this.myForm1.value as User ).subscribe(val => {
      this.router.navigate(['loginSuccess']);
    });
  }
}
