import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient: HttpClient) { }

  saveNewUser(user: User) {

    return this.httpclient.post('http://localhost:9090/user/signup', user);

  }

  loginUser(user: User) {
    return this.httpclient.post('http://localhost:9090/user/login', user);
  }
}
