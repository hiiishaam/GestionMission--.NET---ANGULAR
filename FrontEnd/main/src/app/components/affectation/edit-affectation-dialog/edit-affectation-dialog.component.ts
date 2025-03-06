import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {Affectation} from '../../../model/Models'
@Component({
  selector: 'app-edit-affectation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule 
  ],
  templateUrl: './edit-affectation-dialog.component.html'
})
export class Edit {

  constructor(
    public dialogRef: MatDialogRef<Edit>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Affectation } // Type pour les données de l'employé
  ) {}

  // Sauvegarde les modifications et ferme le dialog
  save(): void {
    this.dialogRef.close(this.data.data);  // Ferme le dialog et renvoie l'employé modifié
  }

  // Annule et ferme le dialog sans renvoyer de données
  onCancel(): void {
    this.dialogRef.close();  // Ferme le dialog sans faire de modifications
  }
}