import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lTraseroPipe',
  standalone: true
})
export class LTraseroPipePipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Ltrasero.includes(filter));
  }

}
