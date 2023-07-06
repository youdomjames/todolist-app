import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from '../components/quote/quote.component';
import { TodoComponent } from '../components/todo/todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AddEditTodoComponent } from '../components/modals/add-edit-todo/add-edit-todo.component';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        HeaderComponent,
        MainComponent,
        FooterComponent,
        WeatherComponent,
        LayoutComponent,
        QuoteComponent,
        TodoComponent,
        TodoListComponent,
        AddEditTodoComponent,
        ConfirmationComponent
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        LayoutRoutingModule,
        NgbDropdownModule,
        SharedModule
    ],
    providers: [
        DatePipe
    ]
})
export class LayoutModule { }
