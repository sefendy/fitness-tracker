import { TrainingService } from './training.service';
import { Component, OnInit/*, OnDestroy */} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import {/* Subscription,*/ Observable } from 'rxjs';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit/*, OnDestroy */{
  // ongoingTraining = false;
  ongoingTraining$: Observable<boolean>;

  // exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   if (exercise) {
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
    // });
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}
