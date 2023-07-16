import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared/components/base-modal/modal.service';
import { AddEditTodoComponent } from '../modals/add-edit-todo/add-edit-todo.component';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor(private modalService: ModalService){}

  addTodo(): void {
    this.modalService.openAddEditTodoModal();
  }

}
