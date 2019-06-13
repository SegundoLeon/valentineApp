import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubastaProcesadaComponent } from './subasta-procesada.component';
import { SubastaAutomaticaComponent } from './subasta-automatica.component';
import { SolicitudListaComponent } from './solicitud-lista.component';
import { SolicitudGeneralComponent } from './solicitud-general.component';
import { SolicitudSolicitudComponent } from './solicitud-solicitud.component';
import { SolicitudEvaluacionComponent } from './solicitud-evaluacion.component';
import { SolicitudPrestamoComponent } from './solicitud-prestamo.component';

// Servicios utilizados por este modulo
import { ParticipacionService } from './participacion.service';
import { SubastaService } from './subasta.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: SubastaAutomaticaComponent,
    children: [
      { path: 'automatica', component: SubastaAutomaticaComponent },
      { path: 'procesada', component: SubastaProcesadaComponent }
    ]
  },
];

@NgModule({
  providers: [ ParticipacionService, SubastaService ],
  declarations: [
    SubastaProcesadaComponent, SubastaAutomaticaComponent, SolicitudListaComponent,
    SolicitudGeneralComponent, SolicitudSolicitudComponent, SolicitudEvaluacionComponent,
    SolicitudPrestamoComponent
    ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ],
  exports: [RouterModule]
})
export class SubastaModule { }
