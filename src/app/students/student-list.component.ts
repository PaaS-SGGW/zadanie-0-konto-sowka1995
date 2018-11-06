import { Component, OnInit } from "@angular/core";
import { StudentService } from "./student-service";

@Component({
  selector: 'students-list',
  template: `
    <div class="row">
      <h2>Lista studentów</h2>
      <table class="table">
        <thead>
          <th>Id</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Wiek</th>
        </thead>
        <tbody>
          <tr student [studentData]="student" *ngFor="let student of students">

          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StudentListComponent implements OnInit {
  students:any;
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      data => { this.students = data },
      err => console.log(err),
      () => console.log('students loading finished')
    );
  }
}
