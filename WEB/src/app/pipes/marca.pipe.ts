import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'marca',
  standalone: true
})
export class MarcaPipe implements PipeTransform {
constructor(private filtroService: DataService) {}

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      this.filtroService.actualizarModelos([]);
      return items;
    }

    const modelosSet = new Set<string>();

    const modelosFiltrados = items
      .filter(item => item.MarcaAuto.toLowerCase().includes(filter.toLowerCase()))
      .forEach(item => modelosSet.add(item.Modelo));

    const modelosArray = Array.from(modelosSet);

    this.filtroService.actualizarModelos(modelosArray);
    
    return items.filter(item => item.MarcaAuto.toLowerCase().includes(filter.toLowerCase()));
  }

}
