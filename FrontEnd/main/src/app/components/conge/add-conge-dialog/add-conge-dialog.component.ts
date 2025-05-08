import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-conge-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule ,
    MatSelectModule
  ],
  templateUrl: './add-conge-dialog.component.html'
})
export class AddCongeDialogComponent  {
[x: string]: any;
  constructor(
    public dialogRef: MatDialogRef<AddCongeDialogComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  save(): void {
    this.dialogRef.close(this.data.data);
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}