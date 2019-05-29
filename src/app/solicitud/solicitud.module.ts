import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudPaso1Component } from './solicitud-paso1.component';
import { SolicitudPaso2Component } from './solicitud-paso2.component';
import { SolicitudPaso3Component } from './solicitud-paso3.component';

// Modulos Angular Material
import { MatPaginatorModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material'
import { MatDividerModule, MatTableModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { MatDatepickerModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { MatNativeDateModule, MatButtonModule, MatRadioModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
// Modulos compartidos
import { CompartidoModule } from '../compartido/compartido.module';

const routes: Routes = [
  {
    path: '',
    component: SolicitudPaso1Component,
  }
];

@NgModule({
  declarations: [SolicitudPaso1Component, SolicitudPaso2Component, SolicitudPaso3Component],
  imports: [
    CommonModule, CompartidoModule, RouterModule.forChild(routes), MatDividerModule, MatTableModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    MatCardModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule,
    ReactiveFormsModule, MatNativeDateModule, MatButtonModule, MatRadioModule, MatDialogModule
  ],
  exports: [RouterModule, SolicitudPaso1Component]
})
export class SolicitudModule { }
