import { Injectable } from '@angular/core';
import DATA from '../../../../assets/temp-data/todolist.json'
import { Todo, TodoDate } from '../../models/todo';
import { Observable, ReplaySubject, filter, map, shareReplay, take, tap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  protected todoListSubject = new ReplaySubject<{day: string, todoList: Todo[]}>();
  $todoList = this.todoListSubject.asObservable();
  dataLength: number = 0;
  protected now = new Date(Date.now());
  protected todoDates: TodoDate[] = [];

  constructor() {
    this.setTodayTasks();
    this.setTomorrowTasks();
    this.setAllOtherTasks();
    this.setDataLength();
  }
  getTodaysTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      filter((data) => data.day === 'today'),
      map(data => data.todoList),
    );
  }

  getTomorrowsTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      filter((data) => data.day == 'tomorrow'),
      map(data => data.todoList),
    )
  }

  getTheRestOfTasks(): Observable<Array<{day: string, todoList: Todo[]}>> {
    this.$todoList.pipe(tap((project => length = length + 1))).subscribe();
     return this.$todoList.pipe(
      take(this.dataLength),
      filter((data) => data.day != 'today' && data.day != 'tomorrow'),
      toArray(),
      map(data => [...data].sort((a, b) => {
        const dateA = new Date(a.todoList[0].date!.year, a.todoList[0].date!.month-1, a.todoList[0].date?.day)
        const dateB = new Date(b.todoList[0].date!.year, b.todoList[0].date!.month-1, b.todoList[0].date?.day)
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
      }
      ))
    )
  }

  private setDataLength() {
    return this.$todoList.pipe(tap((project => this.dataLength = this.dataLength + 1))).subscribe();
  }

  private setTodayTasks() {
    const day = 'today';
    const todoList =  this.filterAndSortTodoList(DATA as Todo[], this.now.getDate(), this.now.getMonth()+1, this.now.getFullYear());
    this.todoListSubject.next({ day, todoList})
  }

  private setTomorrowTasks() {
    const day = 'tomorrow';
    const todoList =  this.filterAndSortTodoList(DATA as Todo[], this.now.getDate()+1, this.now.getMonth()+1, this.now.getFullYear());
    this.todoListSubject.next({ day, todoList})
  }

  private setAllOtherTasks() {
    DATA.forEach((todo) => {
      if(todo.date && (todo.date.day > this.now.getDate()+1 || todo.date.month > this.now.getMonth()+1 || todo.date.year > this.now.getFullYear())){
        const day = `${todo.date.day}/${todo.date.month}/${todo.date.year}`;
        const todoList = this.filterAndSortTodoList(DATA as Todo[], todo.date.day, todo.date.month, todo.date.year)
        this.todoListSubject.next({ day, todoList})
      }
    })
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
