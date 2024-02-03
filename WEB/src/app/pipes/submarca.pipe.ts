import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'submarca',
  standalone: true
})
export class SubmarcaPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.Submarca.toLowerCase().includes(filter.toLowerCase()));
  }

}
