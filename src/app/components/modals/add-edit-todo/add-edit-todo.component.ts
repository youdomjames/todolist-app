import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/base-modal/modal.component';
import { Todo } from 'src/app/shared/models/todo';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent extends ModalComponent implements OnInit{

  @Input() todo: Todo | undefined;
  time: { hour: number; minute: number; } | undefined ;
  addAttendant: boolean= false;
  test:boolean = false;
  todoForm!: FormGroup;

  ngOnInit(): void {
    this.time = this.todo?.time;
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title),
      date: new FormControl(this.todo?.date),
      time: new FormControl(this.time),
      attendance: new FormControl(this.todo?.attendance),
      priority: new FormControl(this.todo?.priority),
      isSentToCalendar: new FormControl(this.todo?.isSentToCalendar)
    })
  }

  submit(){
    console.log(this.todoForm);

  }
}
