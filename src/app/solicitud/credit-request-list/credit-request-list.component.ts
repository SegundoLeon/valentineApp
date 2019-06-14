import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponse, CreditApplication, CreditApplicationDTO,
         Parameter, SearchCreditApplicationDTO } from '../credit-request.model';
import { SolicitudCreditoService } from './../solicitud-credito.service';
import { ParametroService } from './../parametro.service';
import { ParametroConstants } from '../parametro.constants';
import { ParametroModel } from '../parametro.model';

@Component({
  selector: 'app-credit-request-list',
  templateUrl: './credit-request-list.component.html',
  styleUrls: ['./credit-request-list.component.scss'],
})
export class CreditRequestListComponent implements OnInit {
  //public creditDestinationList: Parameter[];
  public dataSource: CreditApplication[];
  public displayedColumns: string[];
  public currentPage: number =  1;
  public numPages: number[] = [];
  public pageSize: number = 10;
  public total: number;
  public solicitud: SearchCreditApplicationDTO = new SearchCreditApplicationDTO();
  //public statusList: Parameter[];

  // los combos del buscador 
  public destinosSolicitud: ParametroModel[] = [];
  public estadosSolicitud: ParametroModel[] = [];

  constructor(private router: Router, private solicitudCreditoService: SolicitudCreditoService, 
              private parametroService: ParametroService) {
    this.displayedColumns = [];
    this.dataSource = [];
  }

  ngOnInit() {
    this.cargarCombos();
    this.search(this.currentPage);
  }

  public goEdit(application: CreditApplication): void {
    this.router
        .navigate(['credit-application/edit', application.code, 'general']);
  }

  private cargarCombos() {
    this.parametroService.getByPadreID(ParametroConstants.ESTADOSOLICITUD).subscribe(
        (result: ParametroModel[]) => { this.estadosSolicitud = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.DESTINOCREDITO).subscribe(
        (result: ParametroModel[]) => { this.destinosSolicitud  = result; }, error => console.error(error), );
  }

  public search(currentPage: number = 1): void {
    this.currentPage = currentPage;
    this.solicitud.Paginacion.Page = currentPage;
    this.solicitud.Paginacion.PageSize = this.pageSize;
    console.log(this.solicitud);
    this.solicitudCreditoService
      .getCreditApplication(this.solicitud)
      .subscribe((response: BaseResponse<CreditApplication>) => {
        this.dataSource = response.data;
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.displayedColumns.push('operations');
        console.log(response);
        this.total = response.total;
        this.numPages = this.calculateNumPages(this.total, this.pageSize);
        console.log(this.numPages);
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
