import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';



@Injectable()
export class TrainingService {
  // exerciseChanged = new Subject<Exercise>();
  // exercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();

  // private availableExercises: Exercise[] = [];

  // private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];
  // private exercises: Exercise[] = [];
  // private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            // tslint:disable-next-line: no-string-literal
            name: doc.payload.doc.data()['name'],
            // tslint:disable-next-line: no-string-literal
            duration: doc.payload.doc.data()['duration'],
            // tslint:disable-next-line: no-string-literal
            calories: doc.payload.doc.data()['calories']
          };
        });
      }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      }
      , error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 3000);
        // this.exercisesChanged.next(null);
      }
      ));
  }

  startExercise(selectedId: string) {
    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({...this.runningExercise});
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed',
      });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });
  }
  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });
  }

  // getRunningExercise() {
  //   return { ...this.runningExercise };
  // }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // this.finishedExercisesChanged.next(exercises);
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }
    // , error => {}
    ));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
