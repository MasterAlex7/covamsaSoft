import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeEspesor',
  standalone: true
})
export class PipeEspesorPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Espesor===filter);
  }

}
