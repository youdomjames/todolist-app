import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { WeatherComponent } from '../weather/weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from '../quote/quote.component';
import { TodoComponent } from '../todo/todo.component';
import { TodoListComponent } from '../todo-list/todo-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    WeatherComponent,
    LayoutComponent,
    QuoteComponent,
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LayoutRoutingModule,
    NgbDropdownModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
