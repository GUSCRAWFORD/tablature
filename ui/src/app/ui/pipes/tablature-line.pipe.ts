import { Pipe, PipeTransform } from '@angular/core';
import { Chord } from '../tablature/tablature.model';

@Pipe({
  name: 'tablatureLine'
})
export class TablatureLinePipe implements PipeTransform {

  transform(value: Chord[], from:number, to:number): any {
    return value.slice(from, to);
  }

}
