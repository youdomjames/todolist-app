import { Injectable } from '@angular/core';
import DATA from '../../../../assets/temp-data/todolist.json'
import { Todo, TodoDate } from '../../models/todo';
import { BehaviorSubject, Observable, ReplaySubject, distinct, filter, map, mergeMap, take, tap, toArray } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  protected todoListSubject = new ReplaySubject<{day: string, todoList: Todo[]}>();
  $todoList = this.todoListSubject.asObservable();
  protected now = new Date(Date.now());
  protected todoDates: TodoDate[] = [];

  constructor(private datePipe: DatePipe) {
    this.setTodayTasks();
    this.setTomorrowTasks();
    this.setAllOtherTasks();
    // this.getTodaysTasks().subscribe(console.log)
    // this.getTomorrowsTasks().subscribe(console.log)
    // this.getTheRestOfTasks(5).subscribe(console.log)
    // this.now.setFullYear();
    // this.$todoList.pipe(
    //   map((todoList) => todoList.map((todo) => todo.date)),
    //   tap((dates) => this.todoDates = dates as TodoDate[])
    // );
  }
  setTodayTasks() {
    const day = 'today';
    const todoList =  this.filterAndSortTodoList(DATA as Todo[], this.now.getDate(), this.now.getMonth()+1, this.now.getFullYear());
    this.todoListSubject.next({ day, todoList})
  }

  setTomorrowTasks() {
    const day = 'tomorrow';
    const todoList =  this.filterAndSortTodoList(DATA as Todo[], this.now.getDate()+1, this.now.getMonth()+1, this.now.getFullYear());
    this.todoListSubject.next({ day, todoList})
  }

  setAllOtherTasks() {
    DATA.forEach((todo) => {
      if(todo.date && (todo.date.day > this.now.getDate()+1 || todo.date.month > this.now.getMonth()+1 || todo.date.year > this.now.getFullYear())){
        const day = `${todo.date.day}/${todo.date.month}/${todo.date.year}`;
        const todoList = this.filterAndSortTodoList(DATA as Todo[], todo.date.day, todo.date.month, todo.date.year)
        this.todoListSubject.next({ day, todoList})
      }
    })
  }

  getTodaysTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      filter((data) => data.day === 'today'),
      map(data => data.todoList)
    );
  }

  getTomorrowsTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      filter((data) => data.day == 'tomorrow'),
      map(data => data.todoList)
    )
  }

  getTheRestOfTasks(count: number): Observable<{day: string, todoList: Todo[]}> {
     return this.$todoList.pipe(
      filter((data) => data.day != 'today' && data.day != 'tomorrow'),
      take(count),
      toArray(),
      map(data => data.sort((a, b) => 
      Date.parse(a.day) > Date.parse(b.day) ? 1 : Date.parse(a.day) < Date.parse(b.day) ? -1 : 0
      )),
      mergeMap(data => data),
      distinct(),
      // tap(console.log)
    )
  }

  private filterAndSortTodoList(todoList: Todo[], day: number, month: number, year: number): Todo[] {
    return todoList.filter((todo: Todo) => todo.date?.day == day && todo.date?.month == month && todo.date.year == year)
      .sort(((todoA: Todo, todoB: Todo) => todoA.time!.hour > todoB.time!.hour ? 1 : todoA.time!.hour < todoB.time!.hour ? -1 : 0))
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
