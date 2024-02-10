import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaInt',
  standalone: true
})
export class DiaIntPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.DiametroInt.includes(filter));
  }
}
