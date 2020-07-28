import { UIService } from './../../shared/ui.service';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;
  // private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    //  this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //    (isLoading) => {
    //      this.isLoading = isLoading;
    //    }
    //  );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }

  fetchExercises()  {
     this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
