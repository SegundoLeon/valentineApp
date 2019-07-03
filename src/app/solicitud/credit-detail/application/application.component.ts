import { Component, OnInit } from '@angular/core';
import { Parameter, SolicitudCredito, UbigeoDTO } from '../../credit-application.model';
import { SolicitudCreditoService } from '../../solicitud-credito.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  public folders: any[];
  public creditDestinationList: Parameter[];
  public seguroDesgravamenList: Parameter[];
  public activityAreaList: Parameter[];
  public jobList: Parameter[];
  public typeAccountList: Parameter[];
  public bankList: Parameter[];
  public solicitud: SolicitudCredito = new SolicitudCredito();
  public formularios: any = {};

  constructor(private creditApplicationService: SolicitudCreditoService) {
    this.creditDestinationList = [];
  }

  ngOnInit() {
    forkJoin(this.creditApplicationService.getAllCreditDestination(),
                        this.creditApplicationService.getSeguroDesgravamen(),
                        this.creditApplicationService.getAllActivityArea(),
                        this.creditApplicationService.getAllJobs(),
                        this.creditApplicationService.getAllTypeAccount(),
                        this.creditApplicationService.getAllBank())
      .subscribe((response) => {
        this.creditDestinationList = response[0];
        this.seguroDesgravamenList = response[1];
        this.activityAreaList = response[2];
        this.jobList = response[3];
        this.typeAccountList = response[4];
        this.bankList = response[5];
        this.solicitud = this.creditApplicationService.solicitudCredito;
        this.formularios = {
          enabled: this.solicitud.EstadoSolicitudId === 55 && (this.solicitud.EstadoSubastaId === 67 ||  this.solicitud.EstadoSubastaId === 71) ||
                   this.solicitud.EstadoSolicitudId === 63 && (this.solicitud.EstadoSubastaId === 69 ||  this.solicitud.EstadoSubastaId === 72) ,

        };
      });    
  }

}
