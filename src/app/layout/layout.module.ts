import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from '../components/quote/quote.component';
import { TodoComponent } from '../components/todo/todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AddEditTodoComponent } from '../components/modals/add-edit-todo/add-edit-todo.component';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from '../shared/pipe/time.pipe';


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
        ConfirmationComponent,
        TimePipe
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        LayoutRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        TimePipe
    ]
})
export class LayoutModule { }
