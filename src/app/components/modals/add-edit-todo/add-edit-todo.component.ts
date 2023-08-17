import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take, tap } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/base-modal/modal.component';
import { ModalService } from 'src/app/shared/components/base-modal/modal.service';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { Person, Todo } from 'src/app/shared/models/todo';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent extends ModalComponent implements OnInit{

  @Input() todo: Todo | undefined;
  time: { hour: number; minute: number; } | undefined ;
  test:boolean = false;
  attendantForm!: FormGroup;
  todoForm!: FormGroup;
  attendance: Array<Person> | undefined;

  constructor(override activeModal: NgbActiveModal, private modalService: ModalService, private toastService: ToastService){
    super(activeModal)
  }

  ngOnInit(): void {
    this.time = this.todo?.time;
    this.attendance = this.todo?.attendance;
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title),
      date: new FormControl(this.todo?.date),
      time: new FormControl(this.time),
      attendance: new FormControl(this.todo?.attendance),
      priority: new FormControl(this.todo?.priority),
      isSentToCalendar: new FormControl(this.todo?.isSentToCalendar)
    })
    this.attendantForm = new FormGroup({
      id: new FormControl(Math.random()),
      firstName: new FormControl(),
      lastName: new FormControl()
    })
    console.log(this.todoForm.controls["attendance"].value);
  }

  submit(){
    console.log(this.todoForm.value);
  }

  addAttendant() {
    console.log(this.attendantForm.value);
    this.attendantForm.reset()
  }

  deleteAttendant(id: number){
    let foundAttendant = this.attendance?.find((attendant)=>attendant.id === id);

    const modalContent = {
      title: 'Delete Confirmation',
      message: 'Do you really want to delete this Attendant?',
      description: `${foundAttendant?.firstName} ${foundAttendant?.lastName}`,
      positiveAction: 'Yes',
      negativeAction: 'No'
    } as ModalContent;

    const modalRef = this.modalService.open(ConfirmationComponent, { backdrop: false, centered: true })
    modalRef.componentInstance.modalContent = modalContent;
    modalRef.componentInstance.positiveAction.pipe(
      take(1),
      tap(() => {
        const index = this.attendance?.findIndex((attendant)=> attendant.id == id);
        if(index && index > 0){
          this.attendance?.splice(index, 1);
          this.todoForm.controls["attendance"].setValue(this.attendance);
          this.toastService.showSuccess(`Attendant ${foundAttendant?.firstName} ${foundAttendant?.lastName} successfully deleted`)
        }else
          this.toastService.showWarning('Attendant not Deleted')
      })).subscribe()

    modalRef.componentInstance.negativeAction.pipe(
      take(1),
      tap(() => {
        modalRef.close()
        this.toastService.showWarning('Dismissed')
      })
    ).subscribe()
  }

}
