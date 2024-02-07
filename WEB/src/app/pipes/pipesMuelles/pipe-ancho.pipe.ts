import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeAncho',
  standalone: true
})
export class PipeAnchoPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Ancho.toLowerCase().includes(filter.toLowerCase()));
  }

}
