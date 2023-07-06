import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  open<TComponent>(component: Type<TComponent>, options: NgbModalOptions): NgbModalRef{
    return this.ngbModal.open(component, { ...options });
  }
}
