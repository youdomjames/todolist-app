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
export class TodoListComponent implements OnInit {
  date = new Date().getDate();
  loadCount = 0;
  loadMore: boolean = false;
  todos: Map<string, Observable<Todo[]>> = new Map<string, Observable<Todo[]>>();
  $restOfTasks: Observable<Array<{day: string, todoList: Todo[]}>> = new Observable();

  constructor(private modalService: ModalService, private timePipe: TimePipe, private toastService: ToastService, private todoListService: TodolistService) {
  }

  ngOnInit(): void {
    this.setValues();
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
        for (let todos of this.todos.values()) {
          // const todoIndex = todos.indexOf(todo, 0)
          // if (todoIndex > -1) {
          //   todos.splice(todoIndex, 1)
            this.toastService.showSuccess('Task successfully deleted')
          // }
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

  check(todo: Todo){
    console.log(todo);
    
  }

  get $todaysTasks(): Observable<Todo[]> {
    return this.todoListService.getTodaysTasks();
  }

  get $tomorrowsTasks(): Observable<Todo[]> {
    return this.todoListService.getTomorrowsTasks();
  }

  // get $restOfTasks(): Observable<Array<{day: string, todoList: Todo[]}>> {
  //   return this.todoListService.getTheRestOfTasks().pipe(
  //     mergeMap(data => data),
  //     distinct(),
  //     take(this.loadCount),
  //     toArray()
  //   );
  // }

  getMoreTasks() {
    this.loadCount = this.loadCount + 1;
    console.log(this.loadCount);
    
    this.$restOfTasks = this.todoListService.getTheRestOfTasks().pipe(
      mergeMap(data => data),
      distinct(),
      take(this.loadCount),
      toArray()
    );
    // const test = this.todoListService.getTheRestOfTasks(this.loadCount)

    // test.pipe(toArray(), tap(console.log)).subscribe()
  }

  setValues(): void {
    // const now = new Date(this.date);
    // const date = {year: now.getFullYear(), month: now.getMonth(), day: now.getDay()}
    // console.log(date);
    
    // // const ngbTime = {hour: now.getHours(), minute: now.getMinutes()} as NgbTimeStruct
    // this.todos.set('today', this.todoListService.getTodaysTasks())

    // this.todos.set('tomorrow', this.todoListService.getTomorrowsTasks())
    
    // this.todoListService.getTheRestOfTasks().pipe(
    //   tap((map) => {
    //     for(let key of map.keys()){
    //       this.todos.set(key, of(map.get(key) as Todo[]))
    //     }
    //   })
    // )
    // this.todos.set('13th January', [
    //   {
    //     id: '9',
    //     title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
    //     time: { hour: now.getHours(), minute: now.getMinutes() },
    //     priority: 'chill'
    //   },
    //   {
    //     id: '10',
    //     title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
    //     time: { hour: now.getHours() + 1, minute: now.getMinutes() },
    //     priority: 'important'
    //   }
    // ])
    // this.todos.set('15th January', [
    //   {
    //     id: '11',
    //     title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
    //     time: { hour: now.getHours() + 3, minute:  (now.getMinutes() > 45 ? now.getMinutes() : now.getMinutes() + 10) },
    //     priority: 'relax'
    //   },
    //   {
    //     id: '12',
    //     title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
    //     time: { hour: now.getHours() + 5, minute: now.getMinutes() },
    //     priority: 'interesting'
    //   }
    // ])
  }
}

