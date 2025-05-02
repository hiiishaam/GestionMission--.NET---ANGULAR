import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppEmployeeComponent } from 'src/app/components/employee/employee.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [
    MaterialModule,
    AppEmployeeComponent,
    FormsModule
  ],
  templateUrl: './paiement.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent { }
