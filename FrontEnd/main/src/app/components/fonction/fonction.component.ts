import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FonctionService } from '../../services/services';
import { Fonction } from '../../model/Models';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AddAffectationDialogComponent } from './add-fonction-dialog/add-fonction-dialog.component';
import { Edit } from './edit-fonction-dialog/edit-fonction-dialog.component';
import { Delete } from './delete-fonction-dialog/delete-fonction-dialog.component';

@Component({
  selector: 'app-fonction',
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
    MatSlideToggleModule,
    MatCardModule
  ],
  templateUrl: './fonction.component.html'
})
export class AppFonctionComponent {
  displayedColumns: string[] = ['id', 'name','actif', 'actions'];
  data: Fonction[] = [];
  dataSource = new MatTableDataSource<Fonction>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: FonctionService, public dialog: MatDialog) {
    this.Load();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  Load(): void {
    this.service.Get().subscribe(data => {
      this.data = data; // Assigner les données récupérées à la variable 'data'
      this.dataSource.data = this.data; // Mettre à jour la source de données pour l'affichage
      console.log('fonctions récupérées :', data); // Affichage des données dans la console
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddAffectationDialogComponent , {
      width: '400px',
      data: {
        data: {
          id: 0,
          name: '',
          actif: true,
        } as Fonction
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.service.Add(result).subscribe({
          next: () => this.Load(),
          error: (err) => console.error('Erreur ajout :', err)
        });
      }
    });
  }

  
  // Méthode pour ouvrir le dialog d'édition
  edit(data: Fonction): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '400px',
      data: { data: { ...data } }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Update(result).subscribe({
          next: () => this.Load(),
          error: (err) => console.error('Erreur modification :', err)
        });
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
          this.service.Delete(id).subscribe({
            next: () => this.Load(),
            error: (err) => console.error('Erreur suppression :', err)
          });
        }
      });
    }
  onActifChange(data: Fonction): void {
    this.service.Update(data).subscribe({
      next: () => console.log('Actif changé avec succès.'),
      error: (err) => console.error('Erreur changement actif :', err)
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}