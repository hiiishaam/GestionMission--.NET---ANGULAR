import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeService,VehiculeService,MissionService ,PdfService} from '../../../services/services';
import { Employee,Vehicule,StatusMission } from '../../../model/Models';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-mission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule
  ],
  templateUrl: './add-mission-dialog.component.html'
})
export class Add {
  currentStep: number = 1;
  employes: Employee[] = [];
  vehicules: Vehicule[] = [];
  statusMission: StatusMission[] = [];

  constructor(
    public dialogRef: MatDialogRef<Add>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService, // Injection du service
    private VehiculeService: VehiculeService, // Service pour les véhicules
    private MissionService: MissionService, // Service pour les missions
    private PdfService: PdfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData(); // Appelle la méthode load() au chargement du composant
    this.data.data.statutId = this.statusMission.find(status => status.code === "draft")?.id
  }

   // Méthode pour charger les employés
  loadData(): void {
    this.employeeService.Get().subscribe((data) => {
      this.employes = data;
      console.log('Employés récupérés :', this.employes);
    });
    // Charger les véhicules
    this.VehiculeService.Get().subscribe((data) => {
      this.vehicules = data;
      console.log('vehicules récupérés :', this.vehicules);
    });
    // Charger les status
    this.MissionService.GetStatus().subscribe((data) => {
      this.statusMission = data;
      console.log('status Mission récupérés :', this.statusMission);
    });
  }

  loadTeams(): void {
    this.employeeService.GetTeams(this.data.data.id).subscribe((data) => {
      this.employes = data;
      console.log('Employés récupérés :', this.employes);
    });
  }

  getEmployeeNameById(empId: number): string {
    // Recherche l'employé par son ID dans la liste des employés
    const emp = this.employes.find(employee => employee.id === empId);
  
    // Si l'employé est trouvé, retourne son nom, sinon retourne 'Inconnu'
    return emp ? emp.firstName : 'Inconnu';
  }
  
  getVehiculeNameById(id: number): string {
    const vehicle = this.vehicules.find(v => v.id === id);
    return vehicle ? vehicle.name : 'Inconnu';
  }

  // Vérification de la validité pour chaque étape
  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        // Étape 1 : Vérification de la validité des champs (nom, dates, description)
        return this.data.data.description &&  this.data.data.name && this.data.data.dateDebut && this.data.data.dateFin && this.data.data.employeId != null;
      case 2:
        // Étape 2 : Vérification de la validité de l'employé concerné
        return true;// this.data.data.employeId != null;
      case 3:
        // Étape 3 : Vérification de la validité des champs de déplacement
        return true;// this.data.data.lieuDepart && this.data.data.destination && this.data.data.dateDepart && this.data.data.dateRetour;
      case 4:
        // Étape 4 : Vérification de la validité pour la validation finale (toujours validé si on arrive là)
        return true;
      default:
        return false;
    }
  }

  // nextStep(): void {
    
  //   if (this.currentStep < 3) {
      
  //     if(this.data.data.id == 0){
  //       this.data.data.statutId = 1;
  //       this.MissionService.Add(this.data.data).subscribe({
  //         next: (createdMission) => {this.data.data.id = createdMission.id; this.currentStep++ ;},
  //         error: (err) => console.error('Erreur ajout :', err)
  //       });
  //     }
  //     else if(this.currentStep != 1){
  //       this.MissionService.Update(this.data.data).subscribe({
  //         next: () => this.currentStep++,
  //         error: (err) => console.error('Erreur ajout :', err)
  //       });
  //     }
  //     else {
  //       this.currentStep++;
  //     }
  //   }
  //    // Charger les employés quand on atteint l'étape 2
  //   if (this.currentStep === 2) {
  //     this.loadTeams();  // Appel de la méthode load() pour charger les employés
  //   }
  // }
  nextStep(): void 
  {  
    switch (this.currentStep) 
    {
      case 1:
          this.ProcessStep1();
          break
      case 2:
        this.ProcessStep2();
         break;
      default: 
        break;
    }
  }
  ProcessStep1()
  {
    if(this.data.data.id == 0)
    {
      this.data.data.statutId = 1;
      this.MissionService.Add(this.data.data).subscribe({
        next: (createdMission) => {this.data.data.id = createdMission.id; this.currentStep++ ;},
        error: (err) => console.error('Erreur ajout :', err)
      });
    }
    else
    {
      this.currentStep++;
    }
    this.loadTeams(); 
  }
  ProcessStep2()
  {
    this.MissionService.UpdateTeamsAndVehicule(this.data.data).subscribe({
      next: () => this.currentStep++,
      error: (err) => console.error('Erreur ajout :', err)
    });
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  printMission(): void {
    this.PdfService.print(this.data.data.id);
  }
  
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  }

  redirectToConsultation(): void {
    this.router.navigate(['/ui-components/mission']);
    // Exemple simple : tu peux router vers une page ou fermer le dialog
    this.dialogRef.close();
  }

  submitMission(): void {
    // Logique pour soumettre la mission
    console.log('Mission soumise:', this.data);
    this.currentStep = 4;
    //this.dialogRef.close(this.data); // Ferme le dialogue avec les données de la mission
  }

  Add(): void {
    this.dialogRef.close(this.data.data);
  }

  Addm(): void {
    //this.dialogRef.close(this.data.data);
    this.data.data.id = 2;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

get isReadOnly(): boolean {
  return this.data?.data?.id > 0;
}
}