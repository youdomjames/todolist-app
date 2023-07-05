import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  date= new Date();
  loadMore:boolean = false;
  todos : Map<string, { title: string; time: number; priority: string; }[]>

  constructor(){
    this.todos = new Map<string, Array<{ title: string; time: number; priority: string; }>>();
  }

  ngOnInit(): void {
    this.setValues();
  }

  edit(){

  }

  delete(){

  }

  getBadgeClass(priority: string){
    let badgeClass = '';
    switch(priority){
      case 'important': {
        badgeClass = 'bg-danger text-white';
        break;
      }
      case 'relax': {
        badgeClass = 'bg-info text-white';
        break;
      }
      case 'chill': {
        badgeClass = 'text-bg-success';
        break;
      }

    }

    return badgeClass;
  }

  setValues(): void {
    this.todos.set('today', [
      {
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: this.date.getTime(),
        priority: 'important'
      },
      {
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+1000),
        priority: 'relax'
      },
      {
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: (this.date.getDate()+800000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+10000000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        time: (this.date.getDate()+100000000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark Tempore alias sunt vitae sequi tempora voluptas ipsum inventore.',
        time: (this.date.getDate()+190000000),
        priority: 'chill'
      }
    ])

    this.todos.set('tomorrow', [
      {
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'important'
      }
    ],)

    this.todos.set('13th January', [
      {
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'important'
      }
    ])
    this.todos.set('15th January', [
      {
        title: 'Metting with Mark ex perferendis sapiente tenetur nisi reprehenderit excepturi',
        time: (this.date.getDate()+2000),
        priority: 'important'
      },
      {
        title: 'Metting with Mark aliquid deserunt sint dolorem eum reiciendis.',
        time: (this.date.getDate()+5000000),
        priority: 'important'
      }
    ])
  }
}
