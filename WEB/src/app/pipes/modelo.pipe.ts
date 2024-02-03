import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelo',
  standalone: true
})
export class ModeloPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Modelo.toLowerCase().includes(filter.toLowerCase()));
  }

}
