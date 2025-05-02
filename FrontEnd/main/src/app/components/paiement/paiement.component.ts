import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PaiementService } from '../../services/services';
import { Paiement } from '../../model/Models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'; 

import { Add } from './add-paiement-dialog/add-paiement-dialog.component';
import { Edit } from './edit-paiement-dialog/edit-paiement-dialog.component';
import { Delete } from './delete-paiement-dialog/delete-paiement-dialog.component';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './paiement.component.html'
})
export class AppPaiementComponent {
  displayedColumns: string[] = ['id', 'name', 'position', 'salary', 'actions'];
  data: Paiement[] = [];
  dataSource = new MatTableDataSource<Paiement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: PaiementService, public dialog: MatDialog) {
    this.Load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Load(): void {
    this.service.Get().subscribe(data => {
      this.data = data;  // Assigner les données récupérées à la variable 'data'
      this.dataSource.data = this.data;  // Mettre à jour la source de données pour l'affichage
      console.log('Paiements récupérés :', data);  // Affichage des données dans la console
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '400px',
      data: { data: { id: 0, name: '', position: '', salary: 0 } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Add(result);
        this.Load();
      }
    });
  }
  // Méthode pour ouvrir le dialog d'édition
  edit(data: Paiement): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '400px',
      data: { data: { ...data } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Update(result);  // Mettre à jour l'employé
        this.Load();  // Recharger la liste après modification
      }
    });
  }
    // Méthode pour afficher la confirmation avant suppression
  delete(id: number): void {
    const dialogRef = this.dialog.open(Delete, {
      width: '400px',
      data: { data: { id: id } }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Delete(id);
        this.Load();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}