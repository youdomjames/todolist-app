import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../models/todo';
import { AddEditTodoComponent } from 'src/app/components/modals/add-edit-todo/add-edit-todo.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  open<TComponent>(component: Type<TComponent>, options: NgbModalOptions): NgbModalRef{
    return this.ngbModal.open(component, { ...options });
  }

  openAddEditTodoModal(todo?: Todo){
    const modalRef = this.ngbModal.open(AddEditTodoComponent, { centered: true, size: 'lg', backdrop: false })
    modalRef.componentInstance.todo = todo;
  }
}
