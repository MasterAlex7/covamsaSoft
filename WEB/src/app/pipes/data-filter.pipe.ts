import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter',
  standalone: true
})
export class DataFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Armadora.toLowerCase().includes(filter.toLowerCase()));
  }
}
