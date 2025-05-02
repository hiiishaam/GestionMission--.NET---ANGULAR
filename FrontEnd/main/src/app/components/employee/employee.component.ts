import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService,FonctionService,AffectationService } from '../../services/services';
import { Employee,Fonction,Affectation } from '../../model/Models';
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

import { AddEmployee } from './add-employee-dialog/add-employee-dialog.component';
import { Edit } from './edit-employee-dialog/edit-employee-dialog.component';
import { Delete } from './delete-employee-dialog/delete-employee-dialog.component';

@Component({
  selector: 'app-employee',
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
    MatCardModule,
    MatSlideToggleModule
  ],
  templateUrl: './employee.component.html'
})
export class AppEmployeeComponent {
  displayedColumns: string[] = ['id', 'name', 'prenom','fonction', 'affectation','actif', 'actions'];
  data: Employee[] = [];
  fonctions: Fonction[] = [];
  affectations: Affectation[] = [];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: EmployeeService, private serviceFonction: FonctionService, private serviceAffectation: AffectationService,  public dialog: MatDialog) {
    this.Load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Load(): void {
    this.service.Get().subscribe(data => {
      this.data = data;
      this.dataSource.data = this.data;
      console.log('Employés récupérés :', data);
    });
       // Récupérer les fonctions via le service FonctionService
    this.serviceFonction.Get().subscribe(data => {
      this.fonctions = data; // Assigner les fonctions récupérées à la variable 'fonctions'
      console.log('Fonctions récupérées :', data); // Affichage dans la console
    });

    this.serviceAffectation.Get().subscribe(data => {
      this.affectations = data; // Assigner les affectations récupérées à la variable 'affectations'
      console.log('Affectations récupérées :', data); // Affichage dans la console
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddEmployee, {
      width: '400px',
      data: { data: 
                {
                  id: 0,
                  firstName: '',
                  lastName: '',
                  
                  actif: true,  
                } as Employee, 
              fonctions: this.fonctions, 
              affectations : this.affectations 
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
  edit(data: Employee): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '400px',
      data: { 
              data: { ...data }, 
              fonctions: this.fonctions, 
              affectations : this.affectations 
            }
    });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.service.Update(result);  // Mettre à jour l'employé
  //       this.Load();  // Recharger la liste après modification
  //     }
  //   });
  // }
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.service.Update(result).subscribe({
        next: () => this.Load(),
        error: (err) => console.error('Erreur edit :', err)
      });
    }
  });
}
    // Méthode pour afficher la confirmation avant suppression
    // Méthode pour afficher la confirmation avant suppression
delete(id: number): void {
  const dialogRef = this.dialog.open(Delete, {
    width: '400px',
    data: { 
      id: id, // Envoi de l'id à la boîte de dialogue pour confirmation
      fonctions: this.fonctions, 
      affectations: this.affectations
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.service.Delete(id).subscribe({
        next: () => this.Load(),  // Recharger la liste après suppression
        error: (err) => console.error('Erreur suppression :', err)
      });
    }
  });
}

  // delete(id: number): void {
  //   const dialogRef = this.dialog.open(Delete, {
  //     width: '400px',
  //     data: { data: { id: id } }
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.service.Delete(id);
  //       this.Load();
  //     }
  //   });
  // }

  getFonctionLibelle(fonctionId: number | null | undefined): string {
  if (!fonctionId) {
    return 'Non défini';
  }
  const fonction = this.fonctions.find(f => f.id === fonctionId);
  return fonction ? fonction.name : 'Non défini';
  }

  getAffectationLibelle(affectationId: number | null | undefined): string {
    if (!affectationId) {
      return 'Non défini';
    }
    const affectation = this.affectations.find(a => a.id === affectationId);
    return affectation ? affectation.name : 'Non défini';
  }
  onActifChange(data: Employee): void {
    this.service.Update(data).subscribe({
      next: () => this.Load(),
      error: (err) => console.error('Erreur changement actif :', err)
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}