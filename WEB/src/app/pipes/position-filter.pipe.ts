import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionFilter',
  standalone: true
})
export class PositionFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Posicion.toLowerCase().includes(filter.toLowerCase()));
  }
}
