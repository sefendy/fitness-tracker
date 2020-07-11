import { map } from 'rxjs/operators';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    // this.exercises = this.db.collection('availableExercises').valueChanges();
   this.exercises = this.db.collection('availableExercises')
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
    }));
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
