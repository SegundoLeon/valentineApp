import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudPaso1Component } from './registro/solicitud-paso1.component';
import { SolicitudPaso2Component } from './registro/solicitud-paso2.component';
import { SolicitudPaso3Component } from './registro/solicitud-paso3.component';

// Modulos Angular Material
import { MatPaginatorModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material'
import { MatDividerModule, MatTableModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { MatDialogModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { MatButtonModule, MatRadioModule, MatIconModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

// Cambiando la localizacion para que el Datepicker funcione
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Modulos compartidos
import { CompartidoModule } from '../compartido/compartido.module';

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
    CommonModule, CompartidoModule, RouterModule.forChild(routes), MatDividerModule, MatTableModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    MatCardModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, 
    ReactiveFormsModule, MatNativeDateModule, MatButtonModule, MatRadioModule, MatDialogModule,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class SolicitudCreditoModule {
  //constructor(private dateAdapter:DateAdapter<Date>) {
  //  dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  //}
 }
