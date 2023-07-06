import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/components/base-modal/modal.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { map, take, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ModalContent } from 'src/app/shared/models/modal-conent';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  date= new Date();
  loadMore:boolean = false;
  todos : Map<string, Array<{ id: string; title: string; time: number; priority: string; }>>

  constructor(private modalService: ModalService, private datePipe: DatePipe){
    this.todos = new Map<string, Array<{ id: string; title: string; time: number; priority: string; }>>();
  }

  ngOnInit(): void {
    this.setValues();
  }

  edit(){
    
  }

  delete(todo: any){
    const modalContent = {
      title: 'Delete Confirmation',
      message: 'Do you want to delete this task?',
      description: todo.title + ' at ' + this.datePipe.transform(todo.time, 'shortTime'),
      positiveAction: 'Yes',
      negativeAction: 'No'
    } as ModalContent;

    const modalRef = this.modalService.open(ConfirmationComponent, {backdrop: false, centered: true})
    modalRef.componentInstance.modalContent = modalContent;
    modalRef.componentInstance.positiveAction.pipe(
      take(1),
      tap(()=>{
      for(let todos of this.todos.values()){
        const todoIndex = todos.indexOf(todo, 0)
          if(todoIndex > -1){
            todos.splice(todoIndex, 1)
          }
       }
    })).subscribe()
    modalRef.componentInstance.negativeAction.pipe(
      take(1),
      tap(()=> modalRef.close())
    ).subscribe()

  }

  getBadgeClass(priority: string){
    let badgeClass = '';
    switch(priority){
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
    this.todos.set('today', [
      {
        id: '1',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: this.date.getTime(),
        priority: 'important'
      },
      {
        id: '2',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+1000),
        priority: 'relax'
      },
      {
        id: '3',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: (this.date.getDate()+800000),
        priority: 'interesting'
      },
      {
        id: '4',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+10000000),
        priority: 'important'
      },
      {
        id: '5',
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: (this.date.getDate()+100000000),
        priority: 'interesting'
      },
      {
        id: '6',
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+190000000),
        priority: 'chill'
      }
    ])

    this.todos.set('tomorrow', [
      {
        id: '7',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'relax'
      },
      {
        id: '8',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'important'
      }
    ],)

    this.todos.set('13th January', [
      {
        id: '9',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'chill'
      },
      {
        id: '10',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'important'
      }
    ])
    this.todos.set('15th January', [
      {
        id: '11',
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'relax'
      },
      {
        id: '12',
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'interesting'
      }
    ])
  }
}

