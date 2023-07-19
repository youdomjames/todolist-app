import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class Todo{
  id?: string;
  title?: string;
  date?: Date;
  time?: Time;
  priority?: string;
  attendance?: Array<Person>;
  isSentToCalendar?: boolean;
  isCompleted?: boolean;
}

export interface Time {
  hour: number;
  minute: number;
}

export interface Date {
  year: number;
  month: number;
  day: number;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}
