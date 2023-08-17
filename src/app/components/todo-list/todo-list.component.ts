import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/components/base-modal/modal.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { Observable, distinct, flatMap, mergeMap, of, take, tap, toArray } from 'rxjs';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { ToastService } from 'src/app/shared/service/toast.service';
import {  Todo, TodoTime } from 'src/app/shared/models/todo';
import { TimePipe } from 'src/app/shared/pipe/time.pipe';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TodolistService } from 'src/app/shared/service/todolist/todolist.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in',
        style({
          opacity: 0
        })
      ),
      transition('void => *', [style({ opacity: 0 }), animate('1s ease-out')]),
    ])
  ]
})
export class TodoListComponent {
  date = new Date().getDate();
  loadCount = 0;
  loadMore: boolean = true;
  todos: Map<string, Observable<Todo[]>> = new Map<string, Observable<Todo[]>>();

  constructor(private modalService: ModalService, private timePipe: TimePipe, private toastService: ToastService, private todoListService: TodolistService) {
  }

  edit(todo: Todo) {
    this.modalService.openAddEditTodoModal(todo)
  }

  delete(todo: Todo) {
    const modalContent = {
      title: 'Delete Confirmation',
      message: 'Do really you want to delete this task?',
      description: todo.title + ' at ' + this.timePipe.transform(todo.time as TodoTime),
      positiveAction: 'Yes',
      negativeAction: 'No'
    } as ModalContent;

    const modalRef = this.modalService.open(ConfirmationComponent, { backdrop: false, centered: true })
    modalRef.componentInstance.modalContent = modalContent;
    modalRef.componentInstance.positiveAction.pipe(
      take(1),
      tap(() => {
          this.toastService.showSuccess('Task successfully deleted')
      })).subscribe()

    modalRef.componentInstance.negativeAction.pipe(
      take(1),
      tap(() => {
        modalRef.close()
        this.toastService.showWarning('Dismissed')
      })
    ).subscribe()

  }

  getBadgeClass(priority: string) {
    let badgeClass = '';
    switch (priority) {
      case 'important': {
        badgeClass = 'bg-danger';
        break;
      }
      case 'relax': {
        badgeClass = 'bg-info';
        break;
      }
      case 'chill': {
        badgeClass = 'bg-success';
        break;
      }
      case 'interesting': {
        badgeClass = 'bg-warning';
        break;
      }
    }
    return badgeClass;
  }

  check(todo: Todo){
    console.log(todo);

  }

  get $todaysTasks(): Observable<Todo[]> {
    return this.todoListService.getTodaysTasks();
  }

  get $tomorrowsTasks(): Observable<Todo[]> {
    return this.todoListService.getTomorrowsTasks();
  }

  get $restOfTasks(): Observable<Array<{day: string, todoList: Todo[]}>> {
    return this.todoListService.getTheRestOfTasks().pipe(
      mergeMap(data => data),
      distinct(),
      take(this.loadCount),
      toArray()
    );
  }

  getMoreTasks(isLoadMoreScope: boolean ) {
    if(isLoadMoreScope){
      this.loadCount = this.loadCount + 5;
    }else{
      this.loadCount = 0;
      this.loadMore = true;
    }
    if(this.loadCount >= this.todoListService.dataLength){
      this.loadMore = false;
    }
  }
}

