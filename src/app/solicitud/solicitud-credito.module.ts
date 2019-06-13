import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudPaso1Component } from './registro/solicitud-paso1.component';
import { SolicitudPaso2Component } from './registro/solicitud-paso2.component';
import { SolicitudPaso3Component } from './registro/solicitud-paso3.component';

// Cambiando la localizacion para que el Datepicker funcione
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Modulos compartidos
import { SharedModule } from '../shared/shared.module';

// Servicios utilizados por este modulo
import { SolicitudCreditoService } from './solicitud-credito.service';
import { UbigeoService } from './ubigeo.service';
import { ParametroService } from './parametro.service';
import { EvaluacionService } from './evaluacion.service';


const routes: Routes = [
  { path: '', component: SolicitudPaso1Component, }
];

//const routes: Routes = [
//  { path: '', component: SolicitudPaso1Component,
//    children: [
//      { path: 'paso1', component: SolicitudPaso1Component },
//      { path: 'paso2, component: SolicitudPaso2Component }
//    ]
//  },
//];

@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    SolicitudCreditoService, UbigeoService, ParametroService, EvaluacionService
    ],
  declarations: [SolicitudPaso1Component, SolicitudPaso2Component, SolicitudPaso3Component],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SolicitudCreditoModule {
  //constructor(private dateAdapter:DateAdapter<Date>) {
  //  dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  //}
 }
