import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicioPesadoComponent } from './components/servicio-pesado/servicio-pesado.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BolsasDeAireComponent } from './components/bolsas-de-aire/bolsas-de-aire.component';
import { ServicioLigeroComponent } from './components/servicio-ligero/servicio-ligero.component';
import { MuellesComponent } from './components/muelles/muelles.component';
import { MenuMuelleComponent } from './components/menus/menu-muelle/menu-muelle.component';
import { AdminMenuComponent } from './components/menus/admin-menu/admin-menu.component';
import { AddSPComponent } from './components/adds/add-sp/add-sp.component';
import { AddBAComponent } from './components/adds/add-ba/add-ba.component';
import { AddSlComponent } from './components/adds/add-sl/add-sl.component';
import { AddMueComponent } from './components/adds/add-mue/add-mue.component';
import { MenuRefaccionesComponent } from './components/menus/menu-refacciones/menu-refacciones.component';
import { RefaccionesComponent } from './components/refacciones/refacciones.component';
import { AddRefaComponent } from './components/adds/add-refa/add-refa.component';
import { TornilleriaComponent } from './components/tornilleria/tornilleria.component';
import { MenuCotizadoresComponent } from './components/menus/menu-cotizadores/menu-cotizadores.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { CotizadoresComponent } from './components/menus/cotizadores/cotizadores.component';
import { AnalisistornilleriaComponent } from './components/analisistornilleria/analisistornilleria.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'servicioPesado', component: ServicioPesadoComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'bolsasdeaire', component: BolsasDeAireComponent, canActivate: [AuthGuard] },
    { path: 'muelles/:marca', component: MuellesComponent, canActivate: [AuthGuard] },
    { path: 'servicioLigero', component: ServicioLigeroComponent, canActivate: [AuthGuard] },
    { path: 'menuMuelles', component: MenuMuelleComponent, canActivate: [AuthGuard] },
    { path: 'adminMenu', component: AdminMenuComponent, canActivate: [AuthGuard] },
    { path: 'addSP/:accion/:idItem', component: AddSPComponent, canActivate: [AuthGuard] },
    { path: 'addSP/:accion', component: AddSPComponent, canActivate: [AuthGuard] },
    { path: 'addBA/:accion/:idItem', component: AddBAComponent, canActivate: [AuthGuard] },
    { path: 'addBA/:accion', component: AddBAComponent, canActivate: [AuthGuard] },
    { path: 'addSL/:accion/:idItem', component: AddSlComponent, canActivate: [AuthGuard] },
    { path: 'addSL/:accion', component: AddSlComponent, canActivate: [AuthGuard] },
    { path: 'addMue/:accion/:idItem', component: AddMueComponent, canActivate: [AuthGuard] },
    { path: 'addMue/:accion', component: AddMueComponent, canActivate: [AuthGuard] },
    { path: 'menuRefacciones', component: MenuRefaccionesComponent, canActivate: [AuthGuard]},
    { path: 'refacciones/:tipo', component: RefaccionesComponent, canActivate: [AuthGuard] },
    { path: 'addRefa/:accion/:idItem', component: AddRefaComponent, canActivate: [AuthGuard] },
    { path: 'addRefa/:accion', component: AddRefaComponent, canActivate: [AuthGuard] },
    { path: 'tornilleria', component: TornilleriaComponent, canActivate: [AuthGuard] },
    { path: 'menuCotizadores', component: MenuCotizadoresComponent, canActivate: [AuthGuard] },
    { path: 'cotizador/:nombre/:id', component: CotizadorComponent, canActivate: [AuthGuard] },
    { path: 'cotizadores/:tipo', component: CotizadoresComponent, canActivate: [AuthGuard] },
    { path: 'analisisTornilleria', component: AnalisistornilleriaComponent, canActivate: [AuthGuard] }
];
