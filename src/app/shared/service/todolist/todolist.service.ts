import { Injectable } from '@angular/core';
import DATA from '../../../../assets/temp-data/todolist.json'
import { Todo, TodoDate } from '../../models/todo';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  protected todoListSubject = new BehaviorSubject(DATA as Todo[]);
  $todoList = this.todoListSubject.asObservable();
  protected now = new Date(Date.now());
  protected todoDates: TodoDate[] = [];

  constructor(private datePipe: DatePipe) { 
    this.$todoList.pipe(
      map((todoList) => todoList.map((todo) => todo.date)),
      tap((dates) => this.todoDates = dates as TodoDate[])
    );
  }

  getTodaysTasks(): Observable<Todo[]> {
    console.log(this.now.getDate(), this.now);
    
    return this.$todoList.pipe(
      // tap(console.log),
      map((todoList) => todoList.filter((todo: Todo) => todo.date?.day == this.now.getDate())
                                .sort(((todoA: Todo, todoB: Todo) => (todoA.time!.hour - todoB.time!.hour) && (todoA.time!.minute - todoB.time!.minute)))
      ),
      tap(console.log)
    );
  }

  getTomorrowsTasks(): Observable<Todo[]> {
    return this.$todoList.pipe(
      map((todoList) => todoList.filter((todo) => todo.date?.day == (this.now.getDay() + 1))
                                .sort(((todoA, todoB) => (todoA.time!.hour - todoB.time!.hour) && (todoA.time!.minute - todoB.time!.minute)))
      )
    )
  }

  getTheRestOfTasks(): Observable<Map<string, Todo[]>> {
    return this.$todoList.pipe(
      map((todoList) => {
        const todoMap = new Map() as Map<string, Todo[]>;
        const todoDate = this.todoDates[0];
        const actualDate = new Date();
        let newTodoList = [];
        actualDate.setFullYear(todoDate.year, todoDate.month, todoDate.day)
        newTodoList = todoList.filter((todo) => (todo.date?.day == todoDate.day && todo.date.month == todoDate.month && todo.date.year == todoDate.year))
                              .sort(((todoA, todoB) => (todoA.time!.hour - todoB.time!.hour) && (todoA.time!.minute - todoB.time!.minute)));
        todoMap.set(this.datePipe.transform(actualDate, 'fullDate') as string, newTodoList)
        this.todoDates.splice(0, 1);
        return todoMap;
      })
    )
  }


}
