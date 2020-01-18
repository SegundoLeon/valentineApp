import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponse, CreditApplication, CreditApplicationDTO,
         Parameter, SearchCreditApplicationDTO } from '../credit-application.model';



import { SolicitudCreditoService } from './../solicitud-credito.service';
import { ParametroService } from './../parametro.service';
import { ParametroConstants } from '../parametro.constants';
import { ParametroModel } from '../parametro.model';

import { Solicitud } from '../solicitud-model';
// Importaciones para la tabla y paginador de angular material
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-credit-request-list',
  templateUrl: './credit-request-list.component.html',
  styleUrls: ['./credit-request-list.component.scss'],
})
export class CreditRequestListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Solicitud>();
  // Nombre de las columnas del conjunto de datos a mostrar en la tabla.
  public displayedColumns = ['code', 'name', 'documentNumber', 'amount', 'date', 'period', 'status', 'penTea', 'finalTea', 'operations'];
  public currentPage =  1;
  public numPages: number[] = [];
  public pageSize = 10;
  public total: number;
  // Clase utilizada para enviar los parametros de la consulta al servicio.
  public solicitud: SearchCreditApplicationDTO = new SearchCreditApplicationDTO();

  // public statusList: Parameter[];

  // los combos del buscador
  public destinosSolicitud: ParametroModel[] = [];
  public estadosSolicitud: ParametroModel[] = [];



  public estaCargando = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private solicitudCreditoService: SolicitudCreditoService,
              private parametroService: ParametroService) {
    //this.displayedColumns = [];
    //this.dataSource = [];
    //this.dataSource2 = [];

  }

  ngOnInit() {
    this.cargarCombos();
    this.search(this.currentPage);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public goEdit(application: CreditApplication): void {
    this.router.navigate(['solicitud/detail', application.code, 'general']);
  }

  private cargarCombos() {
    this.parametroService.getByPadreID(ParametroConstants.ESTADOSOLICITUDCREDITO).subscribe(
        (result: ParametroModel[]) => { this.estadosSolicitud = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.DESTINOCREDITO).subscribe(
        (result: ParametroModel[]) => { this.destinosSolicitud  = result; }, error => console.error(error), );
  }

  public search(currentPage: number = 1): void {
    this.currentPage = currentPage;
    this.solicitud.Paginacion.Page = currentPage;
    this.solicitud.Paginacion.PageSize = this.pageSize;

    //this.solicitudCreditoService.getCreditApplication(this.solicitud);
    this.estaCargando = true;
    this.solicitudCreditoService
      .getCreditApplication(this.solicitud)
      .subscribe((response: Solicitud[]) => {
        this.dataSource.data = response; // response.data;
        //this.displayedColumns = Object.keys(this.dataSource[0]);
        //this.displayedColumns.push('operations');
        this.total = 20;//response.total;
        //this.numPages = this.calculateNumPages(this.total, this.pageSize);
        this.estaCargando = false;
      });
  }

  private calculateNumPages(total: number, size: number): number[] {
    const numPages = Math.ceil(total / size);
    const pages = [];
    for (let i = 0; i < numPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

}
