import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/base-modal/modal.component';
import { ModalContent } from '../../../../app/shared/models/modal-conent';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent extends ModalComponent {
  @Input() modalContent: ModalContent | undefined;
  @Output() positiveAction: EventEmitter<any> = new EventEmitter();
  @Output() negativeAction: EventEmitter<any> = new EventEmitter();

  postiveActionEmitter(){
    this.positiveAction.emit();
    this.dismiss()
  }

  negativeActionEmitter(){
    this.negativeAction.emit();
    this.dismiss()
  }
}
