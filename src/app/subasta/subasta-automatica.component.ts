import { Component, OnInit } from '@angular/core';
import { ParticipacionService } from './participacion.service';
import { ReporteSubastaAutomatica } from './reporteSubastaAutomatica.model';
// Importacion Angular Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-subasta-automatica',
  templateUrl: './subasta-automatica.component.html',
  styleUrls: ['./subasta-automatica.component.scss']
})
export class SubastaAutomaticaComponent implements OnInit {
  fuenteDatos: MatTableDataSource<ReporteSubastaAutomatica>;
  columnasMostradas = ['Fecha', 'Inversiones', 'SumaMontoOferta'];
  estaCargando = false;

  constructor(private participacionService: ParticipacionService) { }

  ngOnInit(): void {
    this.obtenerReporteSubastaAutomatica();
  }

  obtenerReporteSubastaAutomatica() {
    this.estaCargando = true;
    this.participacionService.obtenerReporteSubastaAutomatica('4/1/2018', '7/1/2018').subscribe(
      (respuesta: ReporteSubastaAutomatica[]) => {
        this.fuenteDatos = new MatTableDataSource(respuesta);
        this.estaCargando = false;
      }, error => console.log(error)
    );
  }

}
