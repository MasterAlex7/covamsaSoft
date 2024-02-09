import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-refacciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './menu-refacciones.component.html',
  styleUrl: './menu-refacciones.component.css'
})
export class MenuRefaccionesComponent {
  tipos: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTiposRefa().subscribe(data => {
      this.tipos = data['strAnswer'];
      console.log(data);
    });
  }

}
