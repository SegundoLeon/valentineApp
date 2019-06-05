import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos importados
import { SolicitudModule } from './solicitud/solicitud.module';
import { SubastaModule } from './subasta/subasta.module';
import { PagoModule } from './pago/pago.module';

// Componentes del modulo principal AppModule
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './inicio/acerca-de.component';
import { InversorComponent } from './inicio/inversor.component';
import { NoEncontradoComponent } from './inicio/no-encontrado.component';

// Modulos de Angular Material
import {
  MatToolbarModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatPaginatorModule,
  MatSortModule, MatProgressSpinnerModule, MatDividerModule, MatMenuModule, MatDialogModule
} from '@angular/material';

// Servicios disponibles

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AcercaDeComponent,
    InversorComponent,
    NoEncontradoComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    MatToolbarModule, MatButtonModule, MatFormFieldModule, MatTableModule, SolicitudModule,
    MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDividerModule, MatMenuModule,
    SubastaModule, PagoModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
