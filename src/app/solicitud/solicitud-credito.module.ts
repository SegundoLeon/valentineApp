import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudPaso1Component } from './registro/solicitud-paso1.component';
import { SolicitudPaso2Component } from './registro/solicitud-paso2.component';
import { SolicitudPaso3Component } from './registro/solicitud-paso3.component';
import { CreditRequestListComponent } from './credit-request-list/credit-request-list.component';
import { SolicitudCreditoContenedorComponent } from './solicitud-credito-contenedor.component';
import { SolicitudFinalComponent } from './registro/solicitud-final.component';

// Cambiando la localizacion para que el Datepicker funcione
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Modulos compartidos
import { SharedModule } from '../shared/shared.module';

// Servicios utilizados por este modulo
import { SolicitudCreditoService } from './solicitud-credito.service';
import { UbigeoService } from './ubigeo.service';
import { ParametroService } from './parametro.service';
import { EvaluacionService } from './evaluacion.service';
import { ArchivoService } from './archivo.service';

const routes: Routes = [
  { path: '', component: SolicitudCreditoContenedorComponent, children: [
      { path: 'evalua', component: SolicitudPaso1Component },
      { path: 'evalua/:id', component: SolicitudPaso2Component },
      { path: 'list', component: CreditRequestListComponent },
      { path: 'resultado/:id', component: SolicitudPaso3Component },
      { path: 'final', component: SolicitudFinalComponent },
      { path: 'detail/:id', loadChildren: () => import('./credit-detail/credit-detail.module').then(m => m.CreditDetailModule) }
    ]
  }];

@NgModule({
  providers: [
    SolicitudCreditoService, UbigeoService, ParametroService, EvaluacionService, ArchivoService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }
    ],
  declarations: [
    SolicitudPaso1Component, SolicitudPaso2Component, SolicitudPaso3Component,
    SolicitudCreditoContenedorComponent, CreditRequestListComponent, SolicitudFinalComponent
  ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ],
  exports: [ RouterModule ]
})
export class SolicitudCreditoModule {
  //constructor(private dateAdapter:DateAdapter<Date>) {
  //  dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  //}
 }
