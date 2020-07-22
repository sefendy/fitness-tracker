import { UIService } from './../../shared/ui.service';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = true;
  private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    // this.exercises = this.db.collection('availableExercises').valueChanges();
     this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
       (isLoading) => {
         this.isLoading = isLoading;
       }
     );
     this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
     this.fetchExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }

  fetchExercises()  {
     this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
