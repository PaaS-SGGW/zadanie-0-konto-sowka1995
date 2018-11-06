import { Component , Input } from "@angular/core";

@Component({
  selector: '[student]',
  template: `
    <td>{{ studentData?.id }}</td>
    <td>{{ studentData?.firstname }}</td>
    <td>{{ studentData?.surname }}</td>
    <td>{{ studentData?.age }}</td>
  `
})
export class StudentComponent {
  @Input() studentData: any;
}
