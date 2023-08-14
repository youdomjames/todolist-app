import { Pipe, PipeTransform } from '@angular/core';
import { TodoTime } from '../models/todo';
const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);
@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: TodoTime): unknown {
    if(time.hour === 12 )
      return time != null ? `${pad(time.hour)}:${pad(time.minute)} P.M` : null;
    if(time.hour > 12){
			return time != null ? `${pad(time.hour - 12)}:${pad(time.minute)} P.M` : null;
		}
		return time != null ? `${pad(time.hour)}:${pad(time.minute)} A.M` : null;
  }

}
