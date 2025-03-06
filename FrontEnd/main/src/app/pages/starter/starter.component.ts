import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppPopularProductsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }
