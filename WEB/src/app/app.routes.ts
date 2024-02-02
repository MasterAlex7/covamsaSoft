import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioPesadoComponent } from './components/servicio-pesado/servicio-pesado.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BolsasDeAireComponent } from './components/bolsas-de-aire/bolsas-de-aire.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'servicioPesado', component: ServicioPesadoComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'bolsasdeaire', component: BolsasDeAireComponent, canActivate: [AuthGuard] },
];
