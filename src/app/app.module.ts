import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    MatToolbarModule, MatButtonModule, MatFormFieldModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDividerModule, 
    MatMenuModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
