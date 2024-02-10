import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largo',
  standalone: true
})
export class LargoPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Largo.includes(filter));
  }

}
