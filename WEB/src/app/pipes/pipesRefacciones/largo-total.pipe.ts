import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largoTotal',
  standalone: true
})
export class LargoTotalPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.LargoTot.includes(filter));
  }

}
