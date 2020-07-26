import { NgModule, Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) }
  { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
