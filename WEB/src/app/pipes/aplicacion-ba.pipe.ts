import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aplicacionBA',
  standalone: true
})
export class AplicacionBAPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    const lowercaseFilter = filter.toLowerCase();

    return items.filter(item => 
      item.Aplicacion1.toLowerCase().includes(lowercaseFilter) ||
      item.Aplicacion2.toLowerCase().includes(lowercaseFilter) ||
      item.Aplicacion3.toLowerCase().includes(lowercaseFilter)
    );
  }
}
