import { Component, OnInit } from '@angular/core';
import { Parameter, SolicitudCredito, UbigeoDTO } from '../../credit-application.model';
import { SolicitudCreditoService } from '../../solicitud-credito.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public documentTypeList: Parameter[] = [];
  public gradeList: Parameter[] = [];
  public genderList: Parameter[] = [];
  public maritalStatusList: Parameter[] = [];
  public ubigeoList: UbigeoDTO[] = [];
  public departmentList: UbigeoDTO[] = [];
  public provinceList: UbigeoDTO[] = [];
  public districtList: UbigeoDTO[] = [];
  public solicitud: SolicitudCredito = new SolicitudCredito();
  public formularios: any = {};

  constructor(private creditApplicationService: SolicitudCreditoService) { }

  ngOnInit() {
    forkJoin(this.creditApplicationService.getAllDocumentType(),
             this.creditApplicationService.getAllGender(),
             this.creditApplicationService.getAllGrade(),
             this.creditApplicationService.getAllMaritalStatus(),
             this.creditApplicationService.getUbigeo())
      .subscribe((response) => {
        this.documentTypeList = response[0];
        this.genderList = response[1];
        this.gradeList = response[2];
        this.maritalStatusList = response[3];
        this.ubigeoList = response[4];
        this.solicitud = this.creditApplicationService.solicitudCredito;
        forkJoin(this.creditApplicationService.getUbigeo(this.solicitud.PaisSolicitanteId),
                this.creditApplicationService.getUbigeo(this.solicitud.DepartamentoSolicitanteId),
                this.creditApplicationService.getUbigeo(this.solicitud.ProvinciaSolicitanteId))
        .subscribe((ubigeoResponses) => {
          this.departmentList = ubigeoResponses[0];
          this.provinceList = ubigeoResponses[1];
          this.districtList = ubigeoResponses[2];
        });
        this.formularios = {
          enabled: this.solicitud.EstadoSolicitudId === 55 && 
          (this.solicitud.EstadoSubastaId === 67 ||  this.solicitud.EstadoSubastaId === 71) ||
           this.solicitud.EstadoSolicitudId === 63 && (this.solicitud.EstadoSubastaId === 69 ||  
           this.solicitud.EstadoSubastaId === 72),
        };
      });
  }

  getAllDepartment(ubigeo_id: number | string): void {
    this.creditApplicationService
    .getUbigeo(ubigeo_id)
    .subscribe((response: UbigeoDTO[]) => {
      this.departmentList = response;
    });
  }

  getAllProvince(ubigeo_id: string): void {
    this.creditApplicationService
    .getUbigeo(ubigeo_id)
    .subscribe((response: UbigeoDTO[]) => {
      this.provinceList = response;
    });
  }

  getAllDistrict(ubigeo_id: string): void {
    this.creditApplicationService
    .getUbigeo(ubigeo_id)
    .subscribe((response: UbigeoDTO[]) => {
      this.districtList = response;
    });
  }

}
