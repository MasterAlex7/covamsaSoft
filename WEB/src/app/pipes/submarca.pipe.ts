import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'submarca',
  standalone: true
})
export class SubmarcaPipe implements PipeTransform {

  constructor(private filtroService: DataService) {}

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    const modelosSet = new Set<string>();

    const modelosFiltrados = items
      .filter(item => item.Submarca.toLowerCase().includes(filter.toLowerCase()))
      .forEach(item => modelosSet.add(item.Modelo));

    const modelosArray = Array.from(modelosSet);

    this.filtroService.actualizarModelos(modelosArray);

    return items.filter(item => item.Submarca.toLowerCase().includes(filter.toLowerCase()));
  }

}
