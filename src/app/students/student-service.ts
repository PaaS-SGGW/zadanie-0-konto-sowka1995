import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = "/api/student";
  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(`${this.baseUrl}/get`);
  }
}
