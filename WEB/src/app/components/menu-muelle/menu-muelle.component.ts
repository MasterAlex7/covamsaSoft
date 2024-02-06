import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-muelle',
  standalone: true,
  imports: [],
  templateUrl: './menu-muelle.component.html',
  styleUrl: './menu-muelle.component.css'
})
export class MenuMuelleComponent implements OnInit{
  marcas: string[] = [];

  constructor(private dataService: DataService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.dataService.getMuellesMarca().subscribe(data => {
      this.marcas = data['strAnswer'];
    });
  }
}
