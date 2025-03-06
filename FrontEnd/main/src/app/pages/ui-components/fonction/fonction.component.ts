import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppFonctionComponent } from 'src/app/components/fonction/fonction.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fonction',
  imports: [
    MaterialModule,
    AppFonctionComponent,
    FormsModule
  ],
  templateUrl: './fonction.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FonctionComponent { }
