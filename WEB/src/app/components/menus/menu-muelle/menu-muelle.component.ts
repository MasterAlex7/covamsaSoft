import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

export interface DataMuellesMarca {
  marca: string
}

@Component({
  selector: 'app-menu-muelle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './menu-muelle.component.html',
  styleUrl: './menu-muelle.component.css'
})
export class MenuMuelleComponent implements OnInit{
  dataSource: DataMuellesMarca[] = [];

  constructor(private dataService: DataService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.dataService.getMuellesMarca().subscribe(data => {
      this.dataSource = data['strAnswer'];
      console.log(this.dataSource);
    });
  }
}
