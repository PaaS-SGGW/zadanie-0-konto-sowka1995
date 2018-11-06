import { CreateStudentComponent } from './students/create-student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './students/student-list.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: CreateStudentComponent,
      canDeactivate: ['canDeactivateCreateStudent']
  },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
