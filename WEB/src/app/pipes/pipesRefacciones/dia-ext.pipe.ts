import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaExt',
  standalone: true
})
export class DiaExtPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.DiametroExt.includes(filter));
  }

}
