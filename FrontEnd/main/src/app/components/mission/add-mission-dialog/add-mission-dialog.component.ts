import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeService,VehiculeService,MissionService ,PdfService,CongeService} from '../../../services/services';
import { Employee,EmployeeDisponible,VehiculeDisponible,OrdreMissionDetails,Mission,StatusMission,Conge } from '../../../model/Models';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

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
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-mission-dialog.component.html',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class Add {
  currentStep: number = 1;
  employes: Employee[] = [];
  missions: Mission[] = [];
  vehicules: VehiculeDisponible[] = [];
  statusMission: StatusMission[] = [];
  conges:Conge[] = [];
  teams : EmployeeDisponible[] = [];
  allEmployees : EmployeeDisponible[] = [];

  ordreMissionDetails: OrdreMissionDetails = {
    le: '',
    nomPrenom: '',
    fonction: '',
    affectation: '',
    destination: '',
    motifDeplacement: '',
    moyenDeTransport: '',
    accompagnateurs: '',
    dateDepart: '',
    heureDepart: '',
    dateArrivee: '',
    heureArrivee: ''
};

  constructor(
    public dialogRef: MatDialogRef<Add>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService, // Injection du service
    private VehiculeService: VehiculeService, // Service pour les véhicules
    private MissionService: MissionService, // Service pour les missions
    private CongeService: CongeService, // Service pour les missions

    private PdfService: PdfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData(); 
  }

   // Méthode pour charger les employés
  loadData(): void {
    this.employeeService.Get().subscribe((data) => {
      this.employes = data;
      console.log('Employés récupérés :', this.employes);
    });

    this.MissionService.Get().subscribe(data => {
      this.missions = data;  // Assigner les données récupérées à la variable 'data'
      console.log('Missions récupérées :', data);  // Affichage des données dans la console
    });

    this.CongeService.Get().subscribe(data => {
    this.conges = data;  // Assigner les données récupérées à la variable 'data'
    console.log('congés récupérées :', data);  // Affichage des données dans la console
  });
  }

  loadVehicules(): void {
   // Charger les véhicules
    this.MissionService.getVehiculesDisponibles(this.data.data.id).subscribe((data) => {
      this.vehicules = data;
      console.log('vehicules récupérés :', this.vehicules);
    });
  }

  loadTeams(): void {
     // Charger les véhicules
    this.MissionService.getEmployeesDisponibles(this.data.data.id).subscribe((data) => {
      this.allEmployees = data;
      this.filterTeams();
      console.log('teams récupérés :', this.teams);
    });
  }
  filterTeams() {
    const principalId = this.data.data.employeId;
    if (principalId) {
      this.teams = this.allEmployees.filter(emp => emp.employeeId !== principalId);
    } else {
      this.teams = [...this.allEmployees];
    }
  }

 onEmployeChange() {
  const principalId = this.data.data.employeId;

  // Mets à jour la liste teams en excluant l'employé principal
  if (principalId) {
    this.teams = this.allEmployees.filter(emp => emp.employeeId !== principalId);
  } else {
    this.teams = [...this.allEmployees];
  }

  // Retirer l'employé principal de la sélection teamIds s'il y est
   if (principalId && this.data.data.teamIds) {
    this.data.data.teamIds = this.data.data.teamIds.filter((id: number) => id !== principalId);
  }
}

  getEmployeeNameById(empId: number): string {
    // Recherche l'employé par son ID dans la liste des employés
    const emp = this.teams.find(employee => employee.employeeId === empId);
  
    // Si l'employé est trouvé, retourne son nom, sinon retourne 'Inconnu'
    return emp ? emp.firstName +' '+ emp.lastName : 'Inconnu';
  }
  getVehiculeNameById(id: number): string {
    const vehicle = this.vehicules.find(v => v.vehiculeId === id);
    return vehicle ? vehicle.vehiculeName : 'Inconnu';
  }


isDateRangeValid(): boolean {
  const dateDepart = this.data.data.dateDepart;
  const heureDepart = this.data.data.heureDepart; // format attendu : "HH:mm"
  const dateRetour = this.data.data.dateRetour;
  const heureRetour = this.data.data.heureRetour; // format attendu : "HH:mm"

  if (!dateDepart || !heureDepart || !dateRetour || !heureRetour) {
    return true; // ne valide que si toutes les valeurs sont présentes
  }

  // Fonction pour combiner date + heure en objet Date complet
  function combineDateTime(date: any, time: string): Date {
    const d = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  const depart = combineDateTime(dateDepart, heureDepart);
  const retour = combineDateTime(dateRetour, heureRetour);

  return depart < retour;
}
  // Vérification de la validité pour chaque étape
  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        // Étape 1 : Vérification de la validité des champs (nom, dates, description)
        return this.data.data.description && this.data.data.villeArrive  && this.data.data.dateDepart && this.data.data.dateRetour && this.data.data.heureRetour && this.data.data.heureDepart && this.isDateRangeValid();
      case 2:
        // Étape 2 : Vérification de la validité de l'employé concerné
        return this.data.data.employeId != null;
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
        next: (createdMission) =>
           {
            this.data.data.id = createdMission.id; 
            this.loadTeams(); 
            this.loadVehicules();
            this.currentStep++ ;
           },
        error: (err) => console.error('Erreur ajout :', err)
      });
    }
    else
    {
      this.loadTeams(); 
      this.loadVehicules();
      this.currentStep++;
    }
  
  }
  ProcessStep2()
  {
    this.MissionService.UpdateTeamsAndVehicule(this.data.data).subscribe({
      next: () => 
      {
         this.MissionService.getOrdreMissionDetails(this.data.data.id).subscribe({
              next: (data) => {
                if (data) {
                this.ordreMissionDetails = data[0];  
                this.currentStep++;
                } else {
                  console.warn('Aucune donnée reçue pour l’ordre de mission.');
                }
              },
              error: (err) => {
                console.error('Erreur lors de la récupération des détails:', err);
              }
            });
      

      },
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

  Close(): void {
    this.dialogRef.close();
  }

  submitMission(): void {
    // Logique pour soumettre la mission
    this.data.data.statutId =  this.MissionService.status.find(e => e.code == "Valide")?.id;
    
    this.MissionService.UpdateStatus(this.data.data).subscribe({
              next: () => {
                   this.currentStep = 4;
              },
              error: (err) => {
                this.data.data.statutId =  this.MissionService.status.find(e => e.code == "EnCours")?.id;
                console.error('Erreur lors de la récupération des détails:', err);
              }
            });
  }

  Add(): void {
    this.dialogRef.close(this.data.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

get isReadOnly(): boolean {
  return this.data?.data?.id > 0;
}
}