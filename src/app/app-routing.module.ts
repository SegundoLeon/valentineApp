import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './inicio/acerca-de.component';
import { InversorComponent } from './inicio/inversor.component';
import { NoEncontradoComponent } from './inicio/no-encontrado.component';
// Rutas internas de los modulos
import { SubastaProcesadaComponent } from './subasta/subasta-procesada.component';
import { SubastaAutomaticaComponent } from './subasta/subasta-automatica.component';
import { PagoProcesadoComponent } from './pago/pago-procesado.component';
import { RentabilidadListaComponent } from './pago/rentabilidad-lista.component';
import { RentabilidadDetalleComponent } from './pago/rentabilidad-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'acercade', component: AcercaDeComponent },
  { path: 'inversor', component: InversorComponent },
  { path: 'solicitud', loadChildren: './solicitud/solicitud.module#SolicitudModule' },
  { path: 'subasta/automatica', component: SubastaAutomaticaComponent },
  { path: 'subasta/procesada', component: SubastaProcesadaComponent },
  { path: 'pago/procesado', component: PagoProcesadoComponent },
  { path: 'pago/rentabilidad', component: RentabilidadListaComponent },
  { path: '**', component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
