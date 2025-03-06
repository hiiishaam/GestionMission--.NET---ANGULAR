export interface Employee {
    id: number;
    name: string;
    prenom: string;
    salary: number;
    fonctionId?: number | null; 
    affectationId?: number | null;
    actif:boolean; 
  }

  export interface Affectation {
    id: number;
    name: string;
    actif:boolean;
  }

  export interface Fonction {
    id: number;
    name: string;
    actif:boolean;
  }

  export interface Status {
    id: number;
    name: string;
    position: string;
    salary: number;
  }

  export interface Vehicule {
    id: number;
    name: string;
    matricule: string;
    actif:boolean;
  }

  export interface Mission {
    id: number;
    name: string;
    description: string;
  }

  export interface Paiement {
    id: number;
    name: string;
    position: string;
    salary: number;
  }