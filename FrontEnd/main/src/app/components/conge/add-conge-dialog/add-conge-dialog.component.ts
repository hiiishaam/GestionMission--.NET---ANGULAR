import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { CongeService} from '../../../services/services';
const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-add-conge-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-conge-dialog.component.html',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class AddCongeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCongeDialogComponent>,
    private CongeService : CongeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(): void {
    this.CongeService.CheckEmployeeDisponibilite(this.data.data)
  .subscribe(isBusy => {
    if (isBusy) {
           alert(
          "Cet employé est déjà occupé pendant cette période.\n\n" +
          "Vérifiez s'il n'est pas :\n" +
          "• en congé actif,\n" +
          "• employeur d'une mission en cours ou validée,\n" +
          "• membre d'équipe d'une mission en cours ou validée."
        );
      } else {
        this.dialogRef.close(this.data.data);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

isDateRangeValid(): boolean {
  if (!this.data.data.startDate || !this.data.data.endDate) {
    return true; // ne valide que si toutes les valeurs sont présentes
  }
  return this.data.data.startDate <= this.data.data.endDate;
}
  isStepValid(): boolean {
        return this.data.data.reason 
        && this.data.data.startDate 
        &&  this.data.data.endDate 
        &&  this.data.data.employeeId 
        &&  this.data.data.actif
        && this.isDateRangeValid();
  }
}
