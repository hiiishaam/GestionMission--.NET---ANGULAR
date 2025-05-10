import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, map,throwError } from 'rxjs';
import { Employee,VehiculeDisponible,EmployeeDisponible,OrdreMissionDetails, Fonction,UpdateMission, Affectation, Vehicule, Mission, Paiement,StatusMission ,User, Conge} from '../model/Models';
import {environment } from '../environments/environment';
import {jsPDF} from 'jspdf';

//ok
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = environment.apiUrl + '/Employer';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  Get(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(employes =>
        employes.map(e => ({
          id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
          fonctionId: e.fonctionId,
          affectationId: e.affectationId,
          actif: e.actif,
          updateDate: e.updateDate,
          createDate: e.createDate,
          createdById: e.createdById,
          createdBy: e.createdBy,
          updatedById: e.updatedById,
          updatedBy: e.updatedBy
        } as Employee))
      )
    );
  }

  GetTeams(missionid:number): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl+"/bymission/"+missionid).pipe(
      map(employes =>
        employes.map(e => ({
          id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
          fonctionId: e.fonctionId,
          affectationId: e.affectationId,
          actif: e.actif,
          updateDate: e.updateDate,
          createDate: e.createDate,
          createdById: e.createdById,
          createdBy: e.createdBy,
          updatedById: e.updatedById,
          updatedBy: e.updatedBy
        } as Employee))
      )
    );
  }

  Add(employee: Employee): Observable<Employee> {
    const userId = this.authService.getUser().id;
    const now = new Date().toISOString(); // format ISO correct pour ton backend
    employee.createdById = userId;
    employee.updatedById = userId;
    employee.createDate = now;
    employee.updateDate = now;
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  Update(employee: Employee): Observable<Employee> {
    employee.updatedById = this.authService.getUser().id;
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  GetEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  
}

//ok
@Injectable({ providedIn: 'root' })
export class FonctionService {
  private apiUrl = environment.apiUrl + '/Fonction';

  constructor(private http: HttpClient, private authService: AuthService) {}

  Get(): Observable<Fonction[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(fonctions =>
        fonctions.map(f => ({
          id: f.id,
          name: f.name,
          actif: f.actif,  // Assure-toi que `actif` existe dans la réponse
          updateDate: f.updateDate,
          createDate: f.createDate,
          createdById: f.createdById,
          createdBy: f.createdBy,
          updatedById: f.updatedById,
          updatedBy: f.updatedBy
        } as Fonction))
      )
    );
  }

  Add(fonction: Fonction): Observable<Fonction> {
    const userId = this.authService.getUser().id;
   const now = new Date().toISOString(); // format ISO correct pour ton backend
   fonction.createdById = userId;
   fonction.updatedById = userId;
   fonction.createDate = now;
   fonction.updateDate = now;
    return this.http.post<Fonction>(this.apiUrl, fonction);
  }

  Update(updated: Fonction): Observable<Fonction> {
    updated.updatedById = this.authService.getUser().id;
    return this.http.put<Fonction>(`${this.apiUrl}/${updated.id}`, updated);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

//ok
@Injectable({ providedIn: 'root' })
export class AffectationService {
  private apiUrl = environment.apiUrl + '/Affectation';

  constructor(private http: HttpClient, private authService: AuthService) {}

  Get(): Observable<Affectation[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(affectations =>
        affectations.map(a => ({
          id: a.id,
          name: a.name,
          actif: a.actif,  // Je suppose que ce champ existe dans la réponse
          updateDate: a.updateDate,
          createDate: a.createDate,
          createdById: a.createdById,
          createdBy: a.createdBy,
          updatedById: a.updatedById,
          updatedBy: a.updatedBy
        } as Affectation))
      )
    );
  }

  Add(affectation: Affectation): Observable<Affectation> {
    const userId = this.authService.getUser().id;
   const now = new Date().toISOString(); // format ISO correct pour ton backend
    affectation.createdById = userId;
    affectation.updatedById = userId;
    affectation.createDate = now;
    affectation.updateDate = now;
    return this.http.post<Affectation>(this.apiUrl, affectation);
  }
  

  Update(updated: Affectation): Observable<Affectation> {
    updated.updatedById = this.authService.getUser().id;
    return this.http.put<Affectation>(`${this.apiUrl}/${updated.id}`, updated);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

//ok
@Injectable({ providedIn: 'root' })
export class VehiculeService {
  private apiUrl = environment.apiUrl + '/Vehicule';

  constructor(private http: HttpClient, private authService: AuthService) {}

  Get(): Observable<Vehicule[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(vehicules =>
        vehicules.map(vehicule => ({
          id: vehicule.id,
          name: vehicule.name,
          licensePlateNumber: vehicule.licensePlateNumber,
          horsepower: vehicule.horsepower,
          actif: vehicule.actif,
          updateDate: vehicule.updateDate,
          createDate: vehicule.createDate,
          createdById: vehicule.createdById,
          createdBy: vehicule.createdBy,
          updatedById: vehicule.updatedById,
          updatedBy: vehicule.updatedBy
        } as Vehicule))
      )
    );
  }
  
  Add(vehicule: Vehicule): Observable<Vehicule> {
    const userId = this.authService.getUser().id;
    const now = new Date().toISOString(); // format ISO correct pour ton backend
    vehicule.createdById = userId;
    vehicule.updatedById = userId;
    vehicule.createDate = now;
    vehicule.updateDate = now;
    return this.http.post<Vehicule>(this.apiUrl, vehicule);
  }

  Update(updated: Vehicule): Observable<Vehicule> {
    updated.updatedById = this.authService.getUser().id;
    return this.http.put<Vehicule>(`${this.apiUrl}/${updated.id}`, updated);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class MissionService {
  private apiUrl = environment.apiUrl + '/Mission';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrdreMissionDetails(missionId: number): Observable<OrdreMissionDetails[]> {
      return this.http.get<OrdreMissionDetails[]>(`${this.apiUrl}/ordre-mission-details/${missionId}`);
    }

  getEmployeesDisponibles(missionId: number): Observable<EmployeeDisponible[]> {
    return this.http.get<EmployeeDisponible[]>(`${this.apiUrl}/employees-disponibles/${missionId}`);
  }

  getVehiculesDisponibles(missionId: number): Observable<VehiculeDisponible[]> {
    return this.http.get<VehiculeDisponible[]>(`${this.apiUrl}/vehicules-disponibles/${missionId}`);
  }
  Get(): Observable<Mission[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(missions =>
      missions.map(mission => {
        const { date: dateDepart, time: heureDepart } = this.parseISOStringToLocalDateAndTime(mission.dateDebut);
        const { date: dateRetour, time: heureRetour } = this.parseISOStringToLocalDateAndTime(mission.dateFin);
        return {
          id: mission.id,
          name: mission.name,
          depart: mission.villeDepart,
          description: mission.raison,
          membres: mission.employer?.name,
          employeId: mission.employerId,
          employeName: mission.employer?.lastName,
          vehiculeId: mission.vehiculeId,
          vehiculeName: mission.vehicule?.name,
          statutId: mission.statutId,
          destination: mission.villeArrive,
          dateDepart : dateDepart,
          heureDepart : heureDepart,
          dateRetour : dateRetour,
          heureRetour: heureRetour,
          teamIds: [],
          teamList: mission.employer?.name,
          createdById: mission.createdById,
          createdBy: mission.createdBy,
          updatedById: mission.updatedById,
          updatedBy: mission.updatedBy
        };
      })
    )
  );
  }

  UpdateTeamsAndVehicule(updated: Mission): Observable<Mission>{
    const updatemission: UpdateMission = {
      employeIds: updated.teamIds,
      vehiculeId: updated.vehiculeId,
      createdById: updated.createdById,
      updatedById: updated.updatedById
    };
    return this.http.put<Mission>(`${this.apiUrl}/${updated.id}`, updatemission);
  }

  GetStatus(): Observable<StatusMission[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(statusList =>
        statusList.map(s => ({
          id: s.id,
          name: s.name,
          code:s.code
        } as StatusMission))
      )
    );
  }

private formatDateToISOString(date?: Date, heurestring?: string): string {
  if (!date) return '';
  if (heurestring) {
    const [hoursStr, minutesStr] = heurestring.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (!isNaN(hours) && !isNaN(minutes)) {
      date.setHours(hours);
      date.setMinutes(minutes);
    }
  }
  return date.toISOString();

}
private parseISOStringToLocalDateAndTime(isoString?: string): { date?: Date ; time: string } {
  if (!isoString) return { date: undefined, time: '' };
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return { date: undefined, time: '' };
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return {
    date: date, 
    time: `${hours}:${minutes}` 
  };
}

  Add(mission: Mission): Observable<Mission> {
    let missionToAdd = mission;
    missionToAdd.dateDepartString = this.formatDateToISOString(mission.dateDepart, mission.heureDepart);
    missionToAdd.dateRetourString = this.formatDateToISOString(mission.dateRetour, mission.heureRetour);
    const userId = this.authService.getUser().id;
    missionToAdd.createdById = userId;
    missionToAdd.updatedById = userId;
   console.log("my data :",missionToAdd);
    return this.http.post<Mission>(this.apiUrl, missionToAdd);
  }

  Update(updated: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${updated.id}`, updated);
  }
  
  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  formatDate(dateStr: string): string {
    if(!dateStr)
      return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  }
}

@Injectable({ providedIn: 'root' })
export class PaiementService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  Get(): Observable<Paiement[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users =>
        users.map(user => ({
          id: user.id,
          name: user.name,
          position: user.username,
          salary: 50000
        }))
      )
    );
  }

  Add(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }

  Update(updated: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${updated.id}`, updated);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  _isAuthenticated = false;
  _user: any = null;

  constructor() {
    // Vérifie s'il y a déjà une session sauvegardée
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this._user = JSON.parse(savedUser);
      this._isAuthenticated = true;
    }
  }
  // Cette méthode pourrait être remplacée par une logique d'authentification réelle
  login(username: string, password: string, rememberMe: boolean): boolean {
    // Exemple simplifié : si l'utilisateur entre "adminuser" et "admin123"
    if (username === 'HichamAdmin' && password === 'admin123') {
      this._isAuthenticated = true;
      this._user = {
        id: 1,
        username: 'HichamAdmin',
        email: 'hicham@example.com', 
        role: 'admin'
      } as User;
      
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');  // Persister la connexion
        localStorage.setItem('user', JSON.stringify(this._user));
      } else {
        sessionStorage.setItem('isAuthenticated', 'true'); // Connexion temporaire
        sessionStorage.setItem('user', JSON.stringify(this._user));
      }

      return true;
    } else {
      this._isAuthenticated = false;
      return false;
    }
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true';
  }

  getUser(): User {
    const user = localStorage.getItem('user') ?? sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as User;
    } else {
      // Retourne un objet `User` vide ou avec des valeurs par défaut
      return {
        id: 0,
        username: '',
        password: '',
        email: '',
        role: ''
      } as User;
    }
  }

  // Pour déconnecter l'utilisateur (exemple)
  logout(): void {
    localStorage.removeItem('isAuthenticated');  // Supprimer du localStorage
    sessionStorage.removeItem('isAuthenticated');  // Supprimer du sessionStorage
    this._user = null;
    localStorage.removeItem('user');
  }
}

@Injectable({ providedIn: 'root' })
export class PdfService {
  constructor(private http: HttpClient, private MissionService: MissionService ) {
    this.loadImages();
  }

  // Images en Base64 (remplace par tes vraies valeurs)
  private headerImg = '';
  private footerImg = '';
  private missionImg = '';

  print(id:number) {
    this.MissionService.getOrdreMissionDetails(id).subscribe({
      next: (data) => {
        if (data) {
          this.OpenPdf(data);
        } else {
          console.warn('Aucune donnée reçue pour l’ordre de mission.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails:', err);
      }
    });
  }

  private OpenPdf(datas:OrdreMissionDetails[]) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const headerHeight = 35;
    const headerWidth = 100;

    datas.forEach((data, index) => {
      if (index > 0) doc.addPage(); // Ajouter une page sauf pour la première

     // Ajouter l'image d'en-tête à la position calculée
    doc.addImage(this.headerImg, 'PNG', 50, 5, headerWidth, headerHeight);
   
    let y = 10 + headerHeight + 10;
    // Infos en haut
    doc.setFontSize(12);
    doc.text('N° ............................ /Dir', 20, y);
    doc.text('Le '+data.le, pageWidth - 60, y);
    y += 5;
    doc.addImage(this.missionImg, 'PNG', 25, y, 150, headerHeight);
    y += 10;
  
    doc.setFont('helvetica', 'normal');
    y += 30;

    // Données personnelle
    const rows = [
      ['NOM ET PRENOM..................:', data.nomPrenom],
      ['FONCTION..............................:', data.fonction],
      ['AFFECTATION........................:', data.affectation],
      ['DESTINATION.........................:', data.destination],
      ['MOTIF DE DEPLACEMENT....:', data.motifDeplacement],
      ['MOYEN DE TRANSPORT.......:', data.moyenDeTransport],
      ['ACCOMPAGNATEURS...........:', data.accompagnateurs]
    ];
    // rows.forEach(([label, value]) => {
    //   doc.text(label, 20, y);
    //   doc.text(value, 110, y);
    //   y += 8;
    // });
    rows.forEach(([label, value]) => {
      // Affichage du label
      doc.text(label, 20, y);
    
      // Découpe du texte de la valeur (value) si nécessaire
      const lines = doc.splitTextToSize(value, 90);
    
      // Si lines est un tableau, itérer avec une boucle classique
      for (let i = 0; i < lines.length; i++) {
        doc.text(lines[i], 110, y + (i * 8)); // Décale chaque ligne de 8mm verticalement
      }
    
      // Ajuste la position y après avoir affiché la dernière ligne de la valeur
      y += lines.length * 8; // y est augmenté de la hauteur des lignes affichées
    });



    y += 10;
     // Tableau Départ
     doc.setDrawColor(0);
     doc.setLineWidth(0.5);
     doc.rect(20, y, pageWidth - 40, 10);
     doc.text('DATE ET HEURE DE DEPART', 22, y + 7);
     doc.text('Le', 110, y + 7);
     doc.text(data.dateDepart, 120, y + 7);
     doc.text('à', 150, y + 7);
     doc.text(data.heureDepart, 160, y + 7);
     y += 15;


    // Tableau Arrivée
    doc.rect(20, y, pageWidth - 40, 10);
    doc.text('DATE ET HEURE D\'ARRIVEE', 22, y + 7);
    doc.text('Le', 110, y + 7);
    doc.text(data.dateArrivee, 120, y + 7);
    doc.text('à', 150, y + 7);
    doc.text(data.heureArrivee, 160, y + 7);
    y += 20;


    // Signature
    const text = "Le Directeur de la CADETAF";
    const x = pageWidth / 2;
    doc.setFont('helvetica', 'normal');
    doc.text(text, pageWidth / 2, y, { align: 'center' });
    // Mesurer la largeur du texte pour dessiner la ligne
    const textWidth = doc.getTextWidth(text);
    doc.setLineWidth(0.5);
    doc.line(x - textWidth / 2, y + 2, x + textWidth / 2, y + 2); // Ligne soulignée
   
    // Ajouter footer
    doc.addImage(this.footerImg, 'PNG', 10, pageHeight - 25, pageWidth - 20, 15);
  });
    // Imprimer directement
    const pdfBlob = doc.output('bloburl');
    const printWindow = window.open(pdfBlob, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow?.print();
      };
    }
  }

  
 // Fonction pour récupérer une image et la convertir en Base6
  private getImageAsBase64(imagePath: string): Observable<string> {
    return new Observable((observer) => {
      this.http
        .get(imagePath, { responseType: 'arraybuffer' })
        .subscribe(
          (data: ArrayBuffer) => {
            const base64String = this.arrayBufferToBase64(data);
            observer.next(base64String);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }
   // Conversion d'un ArrayBuffer en Base64
   private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;


    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }


    return window.btoa(binary);
  }
 
  private loadImages() {
    this.getImageAsBase64('../assets/header-cadetaf.png').subscribe(
      (base64) => {
        this.headerImg = base64;
        console.log('Header Image Base64:', this.headerImg);
      },
      (error) => console.error('Erreur de chargement de l\'image :', error)
    );


    this.getImageAsBase64('../assets/footer-cadetaf.png').subscribe(
      (base64) => {
        this.footerImg = base64;
        console.log('Footer Image Base64:', this.footerImg);
      },
      (error) => console.error('Erreur de chargement de l\'image :', error)
    );


    this.getImageAsBase64('../assets/ordre-mission.png').subscribe(
      (base64) => {
        this.missionImg = base64;
        console.log('ordre Image Base64:', this.missionImg);
      },
      (error) => console.error('Erreur de chargement de l\'image :', error)
    );
  }


  // GetMission(id:number): Observable<Mission[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(todos =>
  //       todos.map(todo => ({
  //         id: todo.id,
  //         name: todo.title,
  //         description: 'Description automatique'
  //       }))
  //     )
  //   );
  // }
}


@Injectable({ providedIn: 'root' })
export class CongeService {
  private apiUrl = environment.apiUrl + '/Conge';
  
  constructor(private http: HttpClient, private serviceEmp : EmployeeService , private authService: AuthService) {}


  Get(): Observable<Conge[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(conges =>
        conges.map(e => ({
          id: e.id,
          reason: e.reason,
          startDate: e.startDate,
          endDate: e.endDate,
          employeeId: e.employeeId,
          employee: e.employee,
          actif: e.actif,
          updateDate: e.updateDate,
          createDate: e.createDate,
          createdById: e.createdById,
          createdBy: e.createdBy,
          updatedById: e.updatedById,
          updatedBy: e.updatedBy
        } as Conge))
      )
    );
  }
  Add(conge: Conge): Observable<Conge> {
    const userId = this.authService.getUser().id;
    const now = new Date().toISOString(); 
    conge.createdById = userId;
    conge.updatedById = userId;
    conge.createDate = now;
    conge.updateDate = now;
    return this.http.post<Conge>(this.apiUrl, conge);
  }

  Update(conge: Conge): Observable<Employee> {
    conge.updatedById = this.authService.getUser().id;
    return this.http.put<Employee>(`${this.apiUrl}/${conge.id}`, conge);
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}