import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, 
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modulosMaterial = [
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, FormsModule, ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, modulosMaterial ],
  exports: [ CommonModule, modulosMaterial ]
  // Los componentes dentro de "entryComponents" no pueden ser accedidos desde una ruta
  //entryComponents: [ DialogoExitoComponent, DialogoErrorComponent ]
})
export class SharedModule { }
