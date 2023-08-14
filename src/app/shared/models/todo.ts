import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class Todo{
  id?: number;
  title?: string;
  date?: TodoDate;
  time?: TodoTime;
  priority?: string;
  attendance?: Array<Person>;
  isSentToCalendar?: boolean;
  isCompleted?: boolean;
}

export interface TodoTime {
  hour: number;
  minute: number;
}

export interface TodoDate {
  year: number;
  month: number;
  day: number;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}
