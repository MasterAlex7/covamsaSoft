import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-menu-refacciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule
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
