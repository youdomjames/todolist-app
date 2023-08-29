import { Injectable } from '@angular/core';
import DATA from '../../../../assets/temp-data/todolist.json'
import { Todo, TodoDate } from '../../models/todo';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  protected todoListSubject = new BehaviorSubject<Todo[]>(DATA as Todo[]);
  $todoList = this.todoListSubject.asObservable();
  // dataLength: number = 0;
  protected today!: Date;
  protected tomorrow!: Date;
  // protected todoDates: TodoDate[] = [];

  constructor() {
    this.setTodayAndTomorrow()
    // this.getTodaysTasks().subscribe(console.log)
    // this.getTomorrowsTasks().subscribe(console.log)
    this.getTheRestOfTasks().subscribe(console.log)
  }
  setTodayAndTomorrow() {
    this.today = new Date(Date.now());
    this.tomorrow = new Date(Date.now());
    this.tomorrow.setDate(this.today.getDate() + 1);
    console.log(this.today, this.tomorrow);

  }

  // addTask(todo: Todo) {
  //   this.$todoList.pipe(tap(data =>{
  //     const todoListIncludesId = data.todoList.map((data) => data.id).filter((id) => id === todo.id);

  //     if(todoListIncludesId){
  //       const index = data.todoList.find((data) => data.id === todo.id) as Todo;
  //       if(index){
  //         Object.assign(index, todo)
  //         data.todoList = this.sortTodoList(data.todoList)
  //       }
  //     }else {
  //       if(todo.date == undefined){
  //         return;
  //       }
  //       const day = `${todo.date.day}/${todo.date.month}/${todo.date.year}`;
  //       const todoList = [todo];
  //       this.todoListSubject.next({day, todoList});
  //     }
  //   })).subscribe()
  // }
  // addTask(todo: Todo) {
  //   let isInitNeeded = false;
  //   this.$todoList.pipe(tap(data =>{
  //     const todoListIncludesTodoId = data.todoList.map((data) => data.id).filter((id) => id === todo.id);

  //     if(todoListIncludesTodoId){
  //       const foundTodo = data.todoList.find((data) => data.id === todo.id) as Todo;
  //       let i = 0;


  //       if(foundTodo){
  //         // const test = this.hasDifferentDate(foundTodo, todo);
  //         console.log(foundTodo);
  //         // console.log('test', test);

  //         if(true){
  //           // console.log('DATA.push launched');

  //           isInitNeeded = true;

  //           const indexTodo = data.todoList.findIndex((todo) => todo.id == foundTodo.id);
  //           data.todoList.splice(indexTodo, 1);
  //           // Object.assign(foundTodo, todo)
  //            //to be changed
  //         } else {
  //           Object.assign(foundTodo, todo)
  //           data.todoList = this.sortTodoList(data.todoList)
  //         }
  //       }
  //     }else {
  //       if(todo.date == undefined){
  //         return;
  //       }
  //       const day = `${todo.date.day}/${todo.date.month}/${todo.date.year}`;
  //       const todoList = [todo];
  //       this.todoListSubject.next({day, todoList});
  //     }
  //   })).subscribe()
  //   // console.log('isInitNeeded', isInitNeeded);

  //   if(true){
  //     // console.log('initCalled');
  //     // const index = DATA.findIndex((foundTodo) => todo.id == foundTodo.id);
  //     // DATA.splice(index, 1);
  //     // DATA.push(todo as any)
  //     // this.initData()
  //   }

  // }

  getTodaysTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      map((todos) => this.sortTodoListByTime(this.filterTodoListByDate(todos, this.today)))
    );
  }

  getTomorrowsTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      map((todos) => this.sortTodoListByTime(this.filterTodoListByDate(todos, this.tomorrow)))
    )
  }

  getTheRestOfTasks(): Observable<any> {
    const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
      array.reduce((acc, value, index, array) => {
        (acc[predicate(value, index, array)] ||= []).push(value);
        return acc;
      }, {} as { [key: string]: T[] });
    return this.$todoList.pipe(
      map((todos) => todos.filter(todo => {
        console.log(!this.isDateEqual(todo.date as TodoDate, this.today) && !this.isDateEqual(todo.date as TodoDate, this.tomorrow));

        return !this.isDateEqual(todo.date as TodoDate, this.today) && !this.isDateEqual(todo.date as TodoDate, this.tomorrow)
      })),
      map((todos) => groupBy(todos, todo => `${todo.date?.day}/${todo.date?.month}/${todo.date?.year}`)),
      tap((todos) => console.log(todos))
    )

  }

  private getDate(date: TodoDate): Date {
    return new Date(date.day, date.month - 1, date.year);
  }

  private isDateEqual(actualDate: TodoDate, comparingDate: Date): boolean {
    return actualDate.day === comparingDate.getDate() && actualDate.month === comparingDate.getMonth() + 1 && actualDate.year === comparingDate.getFullYear()
  }

  // private setDataLength() {
  //   return this.$todoList.pipe(tap((project => this.dataLength = this.dataLength + 1))).subscribe();
  // }

  // private setTodayTasks() {
  //   const day = 'today';
  //   const todoList =  this.sortTodoList(this.filterAndSortTodoList(DATA as Todo[], this.now.getDate(), this.now.getMonth()+1, this.now.getFullYear()));
  //   this.todoListSubject.next({ day, todoList})
  // }

  // private setTomorrowTasks() {
  //   const day = 'tomorrow';
  //   const todoList =  this.sortTodoList(this.filterAndSortTodoList(DATA as Todo[], this.now.getDate()+1, this.now.getMonth()+1, this.now.getFullYear()));
  //   this.todoListSubject.next({ day, todoList})
  // }

  // private setAllOtherTasks() {
  //   DATA.forEach((todo) => {
  //     if(todo.date && (todo.date.day > this.now.getDate()+1 || todo.date.month > this.now.getMonth()+1 || todo.date.year > this.now.getFullYear())){
  //       const day = `${todo.date.day}/${todo.date.month}/${todo.date.year}`;
  //       const todoList = this.sortTodoList(this.filterAndSortTodoList(DATA as Todo[], todo.date.day, todo.date.month, todo.date.year))
  //       this.todoListSubject.next({ day, todoList})
  //     }
  //   })
  // }

  private filterTodoListByDate(todoList: Todo[], filteringDate: Date): Todo[] {
    return todoList.filter((todo: Todo) => this.isDateEqual(todo.date as TodoDate, filteringDate))
  }

  public sortTodoListByTime(todoList: Todo[]): Todo[] {
    return todoList.sort(((todoA: Todo, todoB: Todo) => todoA.time!.hour > todoB.time!.hour ? 1 : todoA.time!.hour < todoB.time!.hour ? -1 : 0))
      .sort(((todoA: Todo, todoB: Todo) => {
        let result = 0;
        if (todoA.time!.hour == todoB.time!.hour && todoA.time!.minute > todoB.time!.minute)
          result = 1;
        if (todoA.time!.hour == todoB.time!.hour && todoA.time!.minute < todoB.time!.minute)
          result = -1;
        return result;
      }))
  }
}
