import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bendStrength'
})
export class BendStrengthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0.25: return '¼';
      case 0.5: return '½';
      case 0.75: return '¾';
      case 1: return 'full';
    }
  }

}
