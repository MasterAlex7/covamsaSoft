import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marca',
  standalone: true
})
export class MarcaPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }
    
    return items.filter(item => item.MarcaAuto.toLowerCase().includes(filter.toLowerCase()));
  }

}
