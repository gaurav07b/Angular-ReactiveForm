import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FetchstatesService } from '../fetchstates.service';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

interface Phone {
  area: string;
  tele: string;
}

interface Address {
  hno: string;
  locality: string;
  state: string;
  pin: string;
}

export interface User {
  id?: number;
  fname: string;
  lname?: string;
  username: string;
  password: string;
  contact1: Phone;
  contact2?: Phone;
  dob: Date;
  address: Address;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  states = [];
  constructor(private fb: FormBuilder, private stateserv: FetchstatesService,
    private savedataService: SignupService, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lname: ['', [Validators.pattern(/^[a-zA-Z]+$/)]],
      username: [, [Validators.email, Validators.required]],
      password: [, [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
        Validators.minLength(6)]],
      dob: [, [Validators.required]],
      contact1: this.fb.group({
        area: [, [Validators.required, Validators.pattern(/^\d{3}$/)]],
        tele: [, [Validators.required, Validators.pattern(/^\d{7}$/)]]
      }),
      contact2: this.fb.group({
        area: [, [Validators.pattern(/^\d{3}$/)]],
        tele: [, [Validators.pattern(/^\d{7}$/)]]
      }),
      address: this.fb.group({
        hno: [, [Validators.required]],
        locality: [, [Validators.pattern(/^[a-zA-Z]+$/)]],
        state: [, [Validators.required]],
        pin: [, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      }),
    });
    console.log(this.myForm.controls);
    this.selectState();
  }

  selectState() {
    this.stateserv.getStates().subscribe(val => {
      for (const state of Object.keys(val)) {
        this.states.push({
         value: val[state]
        });
      }
    });
  }

  saveinfo() {
    // const user: User = {
    //   fname: this.myForm.value.fname,
    //   lname: this.myForm.value.lname,
    //   username: this.myForm.value.username,
    //   password: this.myForm.value.password,
    //   contact1: this.myForm.value.contact1,
    //   contact2: this.myForm.value.contact2,
    //   dob: this.myForm.value.dob,
    //   address: this.myForm.value.address
    // };
    window.confirm('Are you sure! Kindly recheck before saving..');
    this.savedataService.saveNewUser(this.myForm.value as User).subscribe(val => {
      this.router.navigate(['']);
    });
  }

}
