import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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

import { AddCongeDialogComponent  } from './add-conge-dialog/add-conge-dialog.component';
import { Edit } from './edit-conge-dialog/edit-conge-dialog.component';
import { Delete } from './delete-conge-dialog/delete-conge-dialog.component';
import { Employee,Conge} from '../../model/Models';
import { EmployeeService,CongeService} from '../../services/services';

@Component({
  selector: 'app-conge',
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
  templateUrl: './conge.component.html'
})
export class AppCongeComponent {
  displayedColumns: string[] = ['id', 'reason','StartDate','EndDate','employee' ,'actif','actions'];
  data: Conge[] = [];
  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Conge>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private serviceEmployee: EmployeeService,private service: CongeService, public dialog: MatDialog) {
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
    console.log('Congés récupérés :', data); // Affichage des données dans la console
  });

  // Récupérer les employés via le service EmployeeService
  this.serviceEmployee.Get().subscribe(data => {
    this.employees = data; // Assigner les employés récupérés à la variable 'employees'
    console.log('Employés récupérés :', data); // Affichage dans la console
  });
}

  add(): void {
    const dialogRef = this.dialog.open(AddCongeDialogComponent , {
      width: '400px',
      data: {
        data: {
          id: 0,
          reason: '',
          actif: true,
        } as Conge,
         employees : this.employees 
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
           result.startDate = this.toISOStringSafe(result.startDate);
           result.endDate = this.toISOStringSafe(result.endDate);
        this.service.Add(result).subscribe({
          next: () => this.Load(),
          error: (err) => console.error('Erreur ajout :', err)
        });
      }
    });
  }

  toISOStringSafe(dateStr: string | Date): string | null {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }

  
  // Méthode pour ouvrir le dialog d'édition
  edit(data: Conge): void {
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
  onActifChange(data: Conge): void {
    this.service.Update(data).subscribe({
      next: () => this.Load(),
      error: (err) => console.error('Erreur changement actif :', err)
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    getEmployeeLibelle(employeeId: number | null | undefined): string {
  if (!employeeId) {
    return 'Non défini';
  }
  const employee = this.employees.find(f => f.id === employeeId);
  return employee ? employee.lastName : 'Non défini';
  }
}