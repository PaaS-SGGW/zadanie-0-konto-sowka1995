import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from './student-service';

@Component({
  selector: 'student-create',
  template: `
    <h2>Dodaj studenta!</h2>
    <hr>
    <div class="col-md-6">
      <form name="newStudentForm" (ngSubmit)="newStudentForm.form.valid && saveStudent(newStudentForm.value)" #newStudentForm="ngForm" novalidate autocomplete="off">

        <div class="form-group">
          <label for="firstname">Imię: </label>
          <input id="firstname" name="firstname" class="form-control"
            required minlength="3" maxlength="60"
            (ngModel)="newStudent.firstname" #firstname="ngModel"/>
        </div>
        <div class="form-group">
          <div *ngIf="firstname.invalid && (firstname.dirty || firstname.touched)" class="alert alert-danger">
            <div *ngIf="firstname?.errors?.required">
              Imię jest wymagane.
            </div>
            <div *ngIf="firstname?.errors?.minlength">
              Imię musi zawierać co najmniej 3 znaki.
            </div>
            <div *ngIf="firstname?.errors?.maxlength">
              Imię może zawierać maksymalnie 60 znaków.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="surname">Nazwisko: </label>
          <input id="surname" name="surname" class="form-control"
            required minlength="3"
            (ngModel)="newStudent.surname" #surname="ngModel"/>
        </div>
        <div class="form-group">
          <div *ngIf="surname?.invalid && (surname.dirty || surname.touched)" class="alert alert-danger">
            <div *ngIf="surname?.errors?.required">
              Nazwisko jest wymagane.
            </div>
            <div *ngIf="surname?.errors?.minlength">
              Nazwisko musi zawierać co najmniej 3 znaki.
            </div>
            <div *ngIf="surname?.errors?.maxlength">
              Nazwisko może zawierać maksymalnie 60 znaków.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="age">Wiek: </label>
          <input id="age" name="age" class="form-control"
            required pattern="(1[89]|[2-9][0-9]|100)"
            (ngModel)="newStudent.age" #age="ngModel"/>
        </div>
        <div class="form-group">
          <div *ngIf="age?.invalid && (age.dirty || age.touched)" class="alert alert-danger">
            <div *ngIf="age?.errors?.required">
              Wiek jest wymagany.
            </div>
            <div *ngIf="age?.errors?.pattern">
              Wiek musi być liczbą od 18 do 100.
            </div>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" [disabled]="newStudentForm.form.pristine || newStudentForm.form.invalid">Zapisz</button>
          <button class="btn btn-primary" (click)="cancel()">Anuluj</button>
        </div>

      </form>
    </div>
  `
})
export class CreateStudentComponent {
  newStudent;
  isDirty: boolean = false;
  constructor(private router: Router, private studentService: StudentService) { }

  cancel() {
    this.router.navigate(['/students']);
  }

  saveStudent(formValues) {
    this.studentService.saveStudent(formValues).subscribe(
      response => {
        window.alert("Dodano studenta! :)");
        this.router.navigate(['/students']);
      },
      err => {
        window.alert("Wystąpił błąd :(");
        console.log(err);
      },
    );
  }
}
