import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './inicio/acerca-de.component';
import { InversorComponent } from './inicio/inversor.component';
import { NoEncontradoComponent } from './inicio/no-encontrado.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'acercade', component: AcercaDeComponent },
  { path: 'inversor', component: InversorComponent },
  { path: 'solicitud', loadChildren: () => import('./solicitud/solicitud-credito.module').then(m => m.SolicitudCreditoModule) },
  { path: 'subasta', loadChildren: () => import('./subasta/subasta.module').then(m => m.SubastaModule) },
  { path: 'pago', loadChildren: () => import('./pago/pago.module').then(m => m.PagoModule) },
  { path: '**', component: NoEncontradoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
