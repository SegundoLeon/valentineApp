import { Component, OnInit } from '@angular/core';
import { PagoService } from './pago.service';
import { ReporteRentabilidad } from './reporteRentabilidad.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rentabilidad-lista',
  templateUrl: './rentabilidad-lista.component.html',
  styleUrls: ['./rentabilidad-lista.component.scss']
})
export class RentabilidadListaComponent implements OnInit {
  fuenteDatos: MatTableDataSource<ReporteRentabilidad>;
  columnasMostradas = ['Periodo', 'Capital', 'Interes', 'Moras', 'Comisiones', 'RetornoNeto', 'Cuotas', 'DetallePeriodo'];
  estaCargando = false;

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
    this.obtenerReporte();
  }

  obtenerReporte() {
    this.estaCargando = true;
    this.pagoService.obtenerReporteRentabilidad('55').subscribe(
      (respuesta: ReporteRentabilidad[]) => {
        this.fuenteDatos = new MatTableDataSource(respuesta);
        this.estaCargando = false;
      }, error => console.log(error)
    );
  }

}
