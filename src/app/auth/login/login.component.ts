import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
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
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
