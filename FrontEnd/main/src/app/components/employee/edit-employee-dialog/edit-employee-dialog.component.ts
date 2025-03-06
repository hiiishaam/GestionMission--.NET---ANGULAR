import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {Employee, Fonction,Affectation} from '../../../model/Models'
@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule 
  ],
  templateUrl: './edit-employee-dialog.component.html'
})
export class Edit {

  constructor(
    public dialogRef: MatDialogRef<Edit>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Employee , fonctions : Fonction[], affectations: Affectation[]} // Type pour les données de l'employé
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