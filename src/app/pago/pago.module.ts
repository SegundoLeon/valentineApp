import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagoService } from './pago.service';
import { PagoProcesadoComponent } from './pago-procesado.component';
import { RentabilidadListaComponent } from './rentabilidad-lista.component';
import { RentabilidadDetalleComponent } from './rentabilidad-detalle.component';
import { PagoContenedorComponent } from './pago-contenedor.component';

const routes: Routes = [
  { path: '', component: PagoContenedorComponent, children: [
      { path: 'procesado', component: PagoProcesadoComponent },
      { path: 'rentabilidad', component: RentabilidadListaComponent },
      { path: 'rentabilidadDetalle', component: RentabilidadDetalleComponent }
    ]
  },
];

@NgModule({
  providers: [ PagoService ],
  declarations: [PagoProcesadoComponent, RentabilidadListaComponent, 
    RentabilidadDetalleComponent, PagoContenedorComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ],
  exports: [ RouterModule ]
})
export class PagoModule { }
