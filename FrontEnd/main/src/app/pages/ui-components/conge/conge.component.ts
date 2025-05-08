import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppCongeComponent } from 'src/app/components/conge/conge.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conge',
  imports: [
    MaterialModule,
    AppCongeComponent,
    FormsModule
  ],
  templateUrl: './conge.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CongeComponent { }
