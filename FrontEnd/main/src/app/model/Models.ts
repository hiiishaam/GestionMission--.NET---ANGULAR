export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    fonctionId: number;
    affectationId: number;
    actif: boolean;
    updateDate: string | null; 
    createDate: string | null;
    createdById: number | null;
    createdBy: any | null; // Ou un modèle User si tu en as un
    updatedById: number | null;
    updatedBy: any | null; // Pareil ici
  }

  export interface Affectation {
    id: number;
    name: string;
    actif: boolean;
    updateDate: string | null; 
    createDate: string | null;
    createdById: number | null;
    createdBy: any | null; // Ou un modèle User si tu en as un
    updatedById: number | null;
    updatedBy: any | null; // Pareil ici
  }
  

  export interface Fonction {
    id: number;
    name: string;
    actif:boolean;
    updateDate: string | null; 
    createDate: string | null;
    createdById: number | null;
    createdBy: any | null; // Ou un modèle User si tu en as un
    updatedById: number | null;
    updatedBy: any | null; // Pareil ici
  }

  export interface Status {
    id: number;
    name: string;
    actif:boolean;
    updateDate:Date;
    createDate:Date;
    createdById:number;
    createdBy:string;
    updatedById:number;
    updatedBy:string;
  }

  export interface Vehicule {
    id: number;
    name: string;
    licensePlateNumber: string;
    horsepower: number;
    actif: boolean;
    updateDate: string | null; 
    createDate: string | null;
    createdById: number | null;
    createdBy: any | null; // Ou un modèle User si tu en as un
    updatedById: number | null;
    updatedBy: any | null; // Pareil ici
  }

  export interface Mission {
    id: number;
    name: string;
    description: string;
    membres?: string; // Ou string[] si tu veux une liste
    employeId?: number;
    employeName?:string;
    vehiculeId?:number;
    vehiculeName?:string;
    statutId?:number;
    // Onglet Déplacement
    destination?: string;
    dateDepart?: string;  // Format ISO string (ex: '2025-04-20')
    dateRetour?: string;  // Pareil que ci-dessus
    teamIds?: number[];
    teamList?: string;
    createdById:number;
    createdBy:string;
    updatedById:number;
    updatedBy:string;
  }

  export interface Paiement {
    id: number;
    name: string;
    position: string;
    salary: number;
  }

  export interface StatusMission {
    id: number;
    name: string;
    code:string;
  }

  // export interface User{
  //   id: number;
  //   username : string;
  //   password:string;
  //   email:string;
  //   role:string;
  // }
  export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    actif: boolean;  // Champ supplémentaire pour refléter 'actif' du backend
    updateDate: Date;  // Champ pour la date de mise à jour
    createDate: Date;  // Champ pour la date de création
  }
  