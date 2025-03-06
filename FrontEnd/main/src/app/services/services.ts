import { Injectable } from '@angular/core';
import { Employee,Fonction,Affectation,Vehicule,Mission,Paiement } from '../model/Models';

@Injectable({ providedIn: 'root' })

export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'Alice', prenom: 'dupont', salary: 50000, fonctionId:1, affectationId:1,actif:true  },
    { id: 2, name: 'Bob', prenom: 'marly', salary: 45000, fonctionId:2 ,affectationId:2,actif:true }
  ];

  Get(): Employee[] {
    return [...this.employees];
  }

  Add(employee: Employee) {
    this.employees.push(employee);
  }

  Update(updatedEmployee: Employee) {
    const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  Delete(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}

@Injectable({ providedIn: 'root' })
export class FonctionService {
  private data: Fonction[] = [
    { id: 1, name: 'Developer',actif:true },
    { id: 2, name: 'Designer',actif:true }
  ];

  Get(): Fonction[] {
    return [...this.data];
  }

  Add(fonction: Fonction) {
    this.data.push(fonction);
  }

  Update(updated: Fonction) {
    const index = this.data.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }

  Delete(id: number) {
    this.data = this.data.filter(e => e.id !== id);
  }
}

@Injectable({ providedIn: 'root' })
export class AffectationService {
  private data: Affectation[] = [
    { id: 1, name: 'Affectation 1',actif:true },
    { id: 2, name: 'Affectation 2',actif:true }
  ];

  Get(): Affectation[] {
    return [...this.data];
  }

  Add(affectation: Affectation) {
    this.data.push(affectation);
  }

  Update(updated: Affectation) {
    const index = this.data.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }

  Delete(id: number) {
    this.data = this.data.filter(e => e.id !== id);
  }
}

@Injectable({ providedIn: 'root' })
export class VehiculeService {
  private data: Vehicule[] = [
    { id: 1, name: 'Vehicule', matricule: 'ER778888',actif:true },
    { id: 2, name: 'Vehicule', matricule: 'MA5355335',actif:true  }
  ];

  Get(): Vehicule[] {
    return [...this.data];
  }

  Add(vehicule: Vehicule) {
    this.data.push(vehicule);
  }

  Update(updated: Vehicule) {
    const index = this.data.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }

  Delete(id: number) {
    this.data = this.data.filter(e => e.id !== id);
  }
}

@Injectable({ providedIn: 'root' })
export class MissionService {
  private data: Mission[] = [
    { id: 1, name: 'Mission', description: 'description 1'},
    { id: 2, name: 'Mission', description: 'description 2'}
  ];

  Get(): Mission[] {
    return [...this.data];
  }

  Add(mission: Mission) {
    this.data.push(mission);
  }

  Update(updated: Mission) {
    const index = this.data.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }

  Delete(id: number) {
    this.data = this.data.filter(e => e.id !== id);
  }
}

@Injectable({ providedIn: 'root' })
export class PaiementService {
  private data: Paiement[] = [
    { id: 1, name: 'Paiement', position: 'Developer', salary: 50000 },
    { id: 2, name: 'Paiement', position: 'Designer', salary: 45000 }
  ];

  Get(): Paiement[] {
    return [...this.data];
  }

  Add(paiement: Paiement) {
    this.data.push(paiement);
  }

  Update(updated: Paiement) {
    const index = this.data.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }

  Delete(id: number) {
    this.data = this.data.filter(e => e.id !== id);
  }
}