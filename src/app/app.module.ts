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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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
