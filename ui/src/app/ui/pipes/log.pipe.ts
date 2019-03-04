import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log'
})
export class LogPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return args?value:'';
  }

}
@Pipe({
  name: 'info'
})
export class InfoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.info(value);
    return args?value:'';
  }

}
@Pipe({
  name: 'warn'
})
export class WarnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.warn(value);
    return args?value:'';
  }

}
@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.error(value);
    return args?value:'';
  }

}
