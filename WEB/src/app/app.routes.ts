import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioPesadoComponent } from './components/servicio-pesado/servicio-pesado.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BolsasDeAireComponent } from './components/bolsas-de-aire/bolsas-de-aire.component';
import { ServicioLigeroComponent } from './components/servicio-ligero/servicio-ligero.component';
import { MuellesComponent } from './components/muelles/muelles.component';
import { MenuMuelleComponent } from './components/menu-muelle/menu-muelle.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'servicioPesado', component: ServicioPesadoComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'bolsasdeaire', component: BolsasDeAireComponent, canActivate: [AuthGuard] },
    { path: 'muelles/:marca', component: MuellesComponent, canActivate: [AuthGuard] },
    { path: 'servicioLigero', component: ServicioLigeroComponent, canActivate: [AuthGuard] },
    { path: 'menuMuelles', component: MenuMuelleComponent, canActivate: [AuthGuard] },
];
