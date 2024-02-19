import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-tornilleria',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  templateUrl: './tornilleria.component.html',
  styleUrl: './tornilleria.component.css'
})
export class TornilleriaComponent {

}
