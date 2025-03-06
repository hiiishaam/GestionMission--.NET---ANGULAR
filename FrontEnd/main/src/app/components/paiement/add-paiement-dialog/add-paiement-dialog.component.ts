import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-paiement-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule 
  ],
  templateUrl: './add-paiement-dialog.component.html'
})
export class Add {
  constructor(
    public dialogRef: MatDialogRef<Add>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  Add(): void {
    this.dialogRef.close(this.data.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}