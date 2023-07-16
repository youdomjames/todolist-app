import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/components/base-modal/modal.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { take, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ModalContent } from 'src/app/shared/models/modal-conent';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Todo } from 'src/app/shared/models/todo';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  date = new Date();
  loadMore: boolean = false;
  todos: Map<string, Array<Todo>> = new Map<string, Array<Todo>>();

  constructor(private modalService: ModalService, private datePipe: DatePipe, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.setValues();
  }

  edit(todo: Todo) {
    this.modalService.openAddEditTodoModal(todo)
  }

  delete(todo: any) {
    const modalContent = {
      title: 'Delete Confirmation',
      message: 'Do really you want to delete this task?',
      description: todo.title + ' at ' + this.datePipe.transform(todo.time, 'shortTime'),
      positiveAction: 'Yes',
      negativeAction: 'No'
    } as ModalContent;

    const modalRef = this.modalService.open(ConfirmationComponent, { backdrop: false, centered: true })
    modalRef.componentInstance.modalContent = modalContent;
    modalRef.componentInstance.positiveAction.pipe(
      take(1),
      tap(() => {
        for (let todos of this.todos.values()) {
          const todoIndex = todos.indexOf(todo, 0)
          if (todoIndex > -1) {
            todos.splice(todoIndex, 1)
            this.toastService.showSuccess('Task successfully deleted')
          }
        }
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

  setValues(): void {
    const now = new Date();
    const date = {year: now.getFullYear(), month: now.getMonth(), day: now.getDay()}
    // const ngbTime = {hour: now.getHours(), minute: now.getMinutes()} as NgbTimeStruct
    this.todos.set('today', [
      {
        id: '1',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        date: date,
        time: { hour: now.getHours(), minute: now.getMinutes() + 15 },
        priority: 'important'
      },
      {
        id: '2',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        date: date,
        time: { hour: now.getHours() + 1, minute: now.getMinutes() },
        priority: 'relax'
      },
      {
        id: '3',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        date: date,
        time: { hour: now.getHours() + 1, minute: (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 5) },
        priority: 'interesting'
      },
      {
        id: '4',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        date: date,
        time: { hour: now.getHours() + 1, minute: (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 10)},
        priority: 'important'
      },
      {
        id: '5',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        date: date,
        time: { hour: now.getHours() + 2, minute: (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 15) },
        priority: 'interesting'
      },
      {
        id: '6',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        date: date,
        time: { hour: now.getHours() + 3, minute: now.getMinutes() },
        priority: 'chill'
      }
    ])

    this.todos.set('tomorrow', [
      {
        id: '7',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        date: { year: date.year, month: date.month, day: (date.day+3) },
        time: { hour: now.getHours() + 1, minute: (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 5) },
        priority: 'relax'
      },
      {
        id: '8',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: { hour: now.getHours() + 3, minute: now.getMinutes() },
        priority: 'important'
      }
    ],)
    const date1 = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate()+4 }
    this.todos.set('13th January', [
      {
        id: '9',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: { hour: now.getHours(), minute: now.getMinutes() },
        priority: 'chill'
      },
      {
        id: '10',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: { hour: now.getHours() + 1, minute: now.getMinutes() },
        priority: 'important'
      }
    ])
    this.todos.set('15th January', [
      {
        id: '11',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: { hour: now.getHours() + 3, minute:  (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 10) },
        priority: 'relax'
      },
      {
        id: '12',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: { hour: now.getHours() + 5, minute: now.getMinutes() },
        priority: 'interesting'
      }
    ])
  }
}

