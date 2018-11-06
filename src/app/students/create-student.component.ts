import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: 'student-create',
  template: `
    <h2>Dodaj studenta!</h2>
    <hr>
    <div class="col-md-6">
      <h3>Formularz</h3>
      <br/>
      <br/>
      <button type="submit" class="btn btn-primary">Zapisz</button>
      <button type="button" class="btn btn-default" (click)="cancel()">Anuluj</button>
    </div>
  `
})
export class CreateStudentComponent {
  isDirty: boolean = true;
  constructor(private router: Router) { }

  cancel() {
    this.router.navigate(['/students']);
  }
}
