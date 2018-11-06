import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StudentComponent } from './students/student/student.component';
import { StudentListComponent } from './students/student-list.component';
import { StudentService } from './students/student-service';
import { NavBarComponent } from './nav/nav-bar.component';
import { CreateStudentComponent } from './students/create-student.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentListComponent,
    NavBarComponent,
    CreateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StudentService,
    {
      provide: 'canDeactivateCreateStudent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateStudentComponent) {
  debugger
  if (component.isDirty) {
    return window.confirm('Nie zapisałeś studenta :(, nie opuszczaj stronki :)');
  }
  return true;
}
