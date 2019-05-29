import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagoProcesadoComponent } from './pago-procesado.component';
import { RentabilidadListaComponent } from './rentabilidad-lista.component';
import { RentabilidadDetalleComponent } from './rentabilidad-detalle.component';

// Modulos Angular Material
import { MatPaginatorModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material'
import { MatDividerModule, MatTableModule, MatFormFieldModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: PagoProcesadoComponent,
    children: [
      { path: 'pagoProcesado', component: PagoProcesadoComponent },
      { path: 'rentabilidadLista', component: RentabilidadListaComponent },
      { path: 'rentabilidadDetalle', component: RentabilidadDetalleComponent }
    ]
  },
];


@NgModule({
  declarations: [PagoProcesadoComponent, RentabilidadListaComponent, RentabilidadDetalleComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), MatDividerModule, MatTableModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
  ],
  exports: [RouterModule, PagoProcesadoComponent]
})
export class PagoModule { }
