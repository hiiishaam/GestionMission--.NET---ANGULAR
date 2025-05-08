import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MissionService } from '../../services/services';
import { Mission } from '../../model/Models';
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

import { Add } from './add-mission-dialog/add-mission-dialog.component';
import { Edit } from './edit-mission-dialog/edit-mission-dialog.component';
import { Delete } from './delete-mission-dialog/delete-mission-dialog.component';
import { View } from './view-mission-dialog/view-mission-dialog.component';

@Component({
  selector: 'app-mission',
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
  templateUrl: './mission.component.html'
})
export class AppMissionComponent {
  displayedColumns: string[] = ['id', 'description', 'depart', 'destination', 'dateDepart', 'dateRetour', 'actions'];
  data: Mission[] = [];
  dataSource = new MatTableDataSource<Mission>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MissionService , public dialog: MatDialog) {
    this.Load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Load(): void {
    this.service.Get().subscribe(data => {
      this.data = data;  // Assigner les données récupérées à la variable 'data'
      this.dataSource.data = this.data;  // Mettre à jour la source de données pour l'affichage
      console.log('Missions récupérées :', data);  // Affichage des données dans la console
    });
  }
  add(): void {
    const data =  { id: 0, name: 'Créer une mission', statutId : 1  };
    this.addOrUpdate(data);
  }
  addOrUpdate(item : any): void {
    const dialogRef = this.dialog.open(Add, {
    width: '90vw',
    height: '80vh',
    maxHeight: '100vh',
    panelClass: 'full-screen-dialog',
        data: { data: item }
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
  edit(data: Mission): void {
    data.name = "Éditer la mission";
    this.addOrUpdate(data);
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
  view(mission: Mission) {
    // Exemple : ouvrir une boîte de dialogue ou router vers une page de détails
    this.dialog.open(View, {
      width: '90vw',
      height: '80vh',
      maxHeight: '100vh',
      data: mission
    });
  
    // OU rediriger vers une page dédiée
    // this.router.navigate(['/missions', mission.id]);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}