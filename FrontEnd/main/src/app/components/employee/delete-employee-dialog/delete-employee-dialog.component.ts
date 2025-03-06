import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule 
  ],
  templateUrl: './delete-employee-dialog.component.html'
})
export class Delete {
  constructor(
    public dialogRef: MatDialogRef<Delete>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  OUI(): void {
    this.dialogRef.close(true);
  }

  NON(): void {
    this.dialogRef.close(false);
  }
}