import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioPesadoComponent } from './components/servicio-pesado/servicio-pesado.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'servicioPesado', component: ServicioPesadoComponent }
];
