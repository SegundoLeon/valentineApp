import { Component, OnInit } from '@angular/core';
import { SubastaService } from './subasta.service';
import { ReporteSubasta } from './reporteSubasta.model';
// Importacion Angular Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-subasta-procesada',
  templateUrl: './subasta-procesada.component.html',
  styleUrls: ['./subasta-procesada.component.scss']
})
export class SubastaProcesadaComponent implements OnInit {
  fuenteDatos: MatTableDataSource<ReporteSubasta>;
  columnasMostradas = ['FechaTermino', 'TotalSubasta', 'FondosExactos', 'FondosMinimos', 'SinFondos'];
  estaCargando = false;

  constructor(private subastaService: SubastaService) { }

  ngOnInit(): void {
    this.obtenerReporteSubasta();
  }

  obtenerReporteSubasta() {
    this.estaCargando = true;
    this.subastaService.obtenerReporteSubasta().subscribe(
      (respuesta: ReporteSubasta[]) => {
        this.fuenteDatos = new MatTableDataSource(respuesta);
        this.estaCargando = false;
      }, error => console.log(error)
    );
  }

}
