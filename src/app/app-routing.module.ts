import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
