import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppAffectationComponent } from 'src/app/components/affectation/affectation.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-affectation',
  imports: [
    MaterialModule,
    AppAffectationComponent,
    FormsModule
  ],
  templateUrl: './affecation.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AffectationComponent { }

// ./affectation.component.html