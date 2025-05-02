import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MissionService } from '../../../services/services';
import { Employee,Vehicule,StatusMission } from '../../../model/Models';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-mission-dialog',
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
    MatCardModule
  ],
  templateUrl: './view-mission-dialog.component.html'
})
export class View {
  currentStep: number = 1;
  employes: Employee[] = [];
  vehicules: Vehicule[] = [];
  statusMission: StatusMission[] = [];

  constructor(
    public dialogRef: MatDialogRef<View>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MissionService: MissionService // Service pour les missions
  ) {}

  printMission(): void {
    const printContent =  this.MissionService.GetPrintContent(this.data.data);
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}