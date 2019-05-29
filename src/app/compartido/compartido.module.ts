import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos de Angular Material
//import { MatToolbarModule, MatButtonModule, MatTableModule } from '@angular/material';
//import { MatFormFieldModule, MatPaginatorModule, MatSortModule } from '@angular/material';
//import { MatProgressSpinnerModule, MatDividerModule, MatDialogModule } from '@angular/material';

//const modulosMaterial = [
//  MatToolbarModule, MatButtonModule, MatTableModule, MatFormFieldModule,
//  MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDividerModule,
//  MatDialogModule
//];

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [ CommonModule ]
  // Los componentes dentro de "entryComponents" no pueden ser accedidos desde una ruta
  //entryComponents: [ DialogoExitoComponent, DialogoErrorComponent ]
})
export class CompartidoModule { }
