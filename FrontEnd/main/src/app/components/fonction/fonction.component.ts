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

import { Add } from './add-fonction-dialog/add-fonction-dialog.component';
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
    this.dataSource.paginator = this.paginator;
  }

  Load(): void {
    this.data = this.service.Get();
    this.dataSource.data = this.data;
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
  edit(data: Fonction): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '400px',
      data: { data: { ...data } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Update(result);  
        this.Load();  
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
  onActifChange(data: Fonction): void {
      this.service.Update(data);
    }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}