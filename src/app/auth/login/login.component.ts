import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'email': new FormControl(null, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    })
  }

}
