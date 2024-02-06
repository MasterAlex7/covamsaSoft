import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posicionMuelle',
  standalone: true
})
export class PosicionMuellePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
