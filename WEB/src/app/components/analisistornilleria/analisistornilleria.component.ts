import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-analisistornilleria',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './analisistornilleria.component.html',
  styleUrl: './analisistornilleria.component.css'
})
export class AnalisistornilleriaComponent {

}
