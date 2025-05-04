import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, map,throwError } from 'rxjs';
import { Employee, Fonction,UpdateMission, Affectation, Vehicule, Mission, Paiement,StatusMission ,User} from '../model/Models';
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
  //private apiUrl = environment.apiUrl +'/todos';
  private apiUrl = environment.apiUrl + '/Mission';
  // private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private authService: AuthService) {}


  Get(): Observable<Mission[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(missions =>
        missions.map(mission => ({
          id: mission.id,
          name: mission.name,
          depart :mission.villeDepart,            
          description: mission.raison,   
          membres: mission.employer?.name, // Si "employer" existe, tu peux ajouter son nom
          employeId: mission.employerId,
          employeName: mission.employer?.lastName, // Si "employer" existe, tu ajoutes son nom
          vehiculeId: mission.vehiculeId,
          vehiculeName: mission.vehicule?.name, // Mappage du nom du véhicule
          statutId: mission.statutId,
          destination: mission.villeArrive,  // Ville d'arrivée comme "destination"
          dateDepart: mission.dateDebut,  // Convertir en ISO string
          dateRetour: mission.dateFin,   // Convertir en ISO string
          teamIds: [],                       // Si tu as des IDs de groupe, tu peux les ajouter ici
          teamList: mission.employer?.name,
          createdById: mission.createdById,
          createdBy: mission.createdBy,
          updatedById: mission.updatedById,
          updatedBy: mission.updatedBy

            // Si tu veux lister des membres, tu peux adapter ici
        } as Mission))
      )
    );
  }
  
  // Get(): Observable<Mission[]> {
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

  Add(mission: Mission): Observable<Mission> {
    // const userId = this.authService.getUser().id;
    // mission.dateDepart = Date.toString();
    // mission.dateRetour = Date.toString();
    const userId = this.authService.getUser().id;
    mission.createdById = userId;
    mission.updatedById = userId;
   console.log("my data :",mission);
    return this.http.post<Mission>(this.apiUrl, mission);
  }

  Update(updated: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${updated.id}`, updated);
  }
  
  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  GetPrintContent(mission : Mission){
    const printContent = `
      <html>
        <head>
          <title>Mission - ${mission.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h2>Détails de la mission</h2>
          <p><strong>Nom :</strong> ${mission.name}</p>
          <p><strong>Employé concerné :</strong> ${mission.employeName}</p>
          <p><strong>Date de début :</strong> ${this.formatDate(mission.dateDepart ?? '')}</p>
          <p><strong>Date de fin :</strong> ${this.formatDate(mission.dateRetour ?? '')}</p>
          <p><strong>Description :</strong> ${mission.description || 'Aucune description'}</p>
          <p><strong>Équipe :</strong> ${mission.teamList}</p>
          <p><strong>Véhicule :</strong> ${mission.vehiculeName}</p>
        </body>
      </html>
    `;

    return printContent;
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
  constructor(private http: HttpClient, ) {
    this.loadImages();
  }


  // Images en Base64 (remplace par tes vraies valeurs)
  private headerImg = '';
  private footerImg = '';
  private missionImg = '';
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
 
  print(id:number) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const headerHeight = 35;
    const headerWidth = 100;
     // Ajouter l'image d'en-tête à la position calculée
    doc.addImage(this.headerImg, 'PNG', 50, 5, headerWidth, headerHeight);
   
    let y = 10 + headerHeight + 10;
    // Infos en haut
    doc.setFontSize(12);
    doc.text('N° ............................ /Dir', 20, y);
    doc.text('Le 21/04/2025', pageWidth - 60, y);
    y += 5;
    doc.addImage(this.missionImg, 'PNG', 25, y, 150, headerHeight);
    y += 10;


    doc.setFont('helvetica', 'normal');
    y += 30;


    // Données personnelles
    const data = [
      ['NOM ET PRENOM..................:', 'M. El Hou'],
      ['FONCTION............................:', 'Adjoint Technique de 1er Grade'],
      ['AFFECTATION.....................:', 'Errachidia'],
      ['DESTINATION.....................:', 'Ouarzazate'],
      ['MOTIF DE DEPLACEMENT....:', 'Raison de service'],
      ['MOYEN DE TRANSPORT......:', 'Kia Matricule: 54876 T 6'],
      ['ACCOMPAGNATEURS.........:', 'Personnes à bord']
    ];
    data.forEach(([label, value]) => {
      doc.text(label, 20, y);
      doc.text(value, 110, y);
      y += 8;
    });
    y += 10;
     // Tableau Départ
     doc.setDrawColor(0);
     doc.setLineWidth(0.5);
     doc.rect(20, y, pageWidth - 40, 10);
     doc.text('DATE ET HEURE DE DEPART', 22, y + 7);
     doc.text('Le', 110, y + 7);
     doc.text('21/04/2025', 120, y + 7);
     doc.text('à', 150, y + 7);
     doc.text('13:00:00', 160, y + 7);
     y += 15;


    // Tableau Arrivée
    doc.rect(20, y, pageWidth - 40, 10);
    doc.text('DATE ET HEURE D\'ARRIVEE', 22, y + 7);
    doc.text('Le', 110, y + 7);
    doc.text('', 120, y + 7);
    doc.text('à', 150, y + 7);
    doc.text('', 160, y + 7);
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
    // Imprimer directement
    const pdfBlob = doc.output('bloburl');
    const printWindow = window.open(pdfBlob, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow?.print();
      };
    }
  }


 // Fonction pour récupérer une image et la convertir en Base64
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
