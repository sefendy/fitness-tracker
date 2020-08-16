import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter/*, OnDestroy*/ } from '@angular/core';
import * as fromRoot from '../../app.reducer';
import { Observable /*, Subscription */} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit/*, OnDestroy */{
  @Output() closeSidenav = new EventEmitter<void>();
  // authSubscription: Subscription;
  // isAuth = false;
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

  onClose() {
    this.closeSidenav.emit();
  }

}
