import { Component, OnInit, AfterViewInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

import { StatistiqueService } from '../../services/services';
import { Statistique } from '../../model/Models';

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './popular-products.component.html',
})
export class AppPopularProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('missionsChart') missionsChart?: BaseChartDirective;
  @ViewChild('employeesChart') employeesChart?: BaseChartDirective;
  @ViewChild('vehiclesChart') vehiclesChart?: BaseChartDirective;
  @ViewChild('othersChart') othersChart?: BaseChartDirective;

  pieChartType: 'pie' = 'pie';

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  // Initialisation simple, on recrée les objets plus tard pour la réactivité
  pieChartDataMissions = this.initChart(['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']);
  pieChartDataEmployees = this.initChart(['#26C6DA']);
  pieChartDataVehicles = this.initChart(['#D4E157']);
  pieChartDataOthers = this.initChart(['#EF5350', '#8D6E63', '#26A69A']);

  private service = inject(StatistiqueService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    // Pas de chargement ici pour éviter problème de @ViewChild non défini
  }

  ngAfterViewInit(): void {
    this.loadStatistiques();
  }

  private initChart(colors: string[]) {
    return {
      labels: [] as string[],
      datasets: [{
        data: [] as number[],
        backgroundColor: colors
      }]
    };
  }

  loadStatistiques(): void {
    this.service.getStatistiques().subscribe((data: Statistique[]) => {
      const lowerType = (s: string) => s.toLowerCase();

      // Pour forcer Angular à détecter le changement, on recrée les objets chart

      // Missions
      const missions = data.filter(d => lowerType(d.type) === 'missions');
      this.pieChartDataMissions = {
        labels: missions.map(d => d.statut),
        datasets: [{
          data: missions.map(d => d.nombre),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
        }]
      };

      // Employés
      const employees = data.filter(d => lowerType(d.type) === 'employés');
      this.pieChartDataEmployees = {
        labels: employees.map(d => d.statut),
        datasets: [{
          data: employees.map(d => d.nombre),
          backgroundColor: ['#26C6DA']
        }]
      };

      // Véhicules
      const vehicles = data.filter(d => lowerType(d.type) === 'véhicules');
      this.pieChartDataVehicles = {
        labels: vehicles.map(d => d.statut),
        datasets: [{
          data: vehicles.map(d => d.nombre),
          backgroundColor: ['#D4E157']
        }]
      };

      // Autres
      const others = data.filter(d =>
        !['missions', 'employés', 'véhicules'].includes(lowerType(d.type))
      );
      this.pieChartDataOthers = {
        labels: others.map(d => `${d.type} (${d.statut})`),
        datasets: [{
          data: others.map(d => d.nombre),
          backgroundColor: ['#EF5350', '#8D6E63', '#26A69A']
        }]
      };

      // Forcer la détection
      this.cdr.detectChanges();

      // Mettre à jour les graphiques si ils sont définis
      if (this.missionsChart) this.missionsChart.update();
      if (this.employeesChart) this.employeesChart.update();
      if (this.vehiclesChart) this.vehiclesChart.update();
      if (this.othersChart) this.othersChart.update();
    });
  }
}
