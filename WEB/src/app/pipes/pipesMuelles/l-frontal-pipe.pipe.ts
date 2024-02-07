import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lFrontalPipe',
  standalone: true
})
export class LFrontalPipePipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Lfrontal.includes(filter));
  }

}
