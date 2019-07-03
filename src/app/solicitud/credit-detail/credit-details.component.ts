import { Component, OnInit } from '@angular/core';
import { SolicitudCreditoService } from '../solicitud-credito.service';
import { SolicitudCreditoRequest } from '../credit-application.model';
import { ArchivoService } from '../archivo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-credit-details',
  templateUrl: './credit-details.component.html',
  styles: [`
  .container .tab-section { display: flex; }
  .container .tab-section .content  { flex: 4; }
  .container .tab-section .actions  { flex: 1; }
  `]
})
export class CreditDetailsComponent implements OnInit {
  public documentId: string;
  public showChildView: boolean;
  public navLinks = [
    { label: 'General', path: 'general', index: 0 },
    { label: 'Solicitud', path: 'application', index: 1 },
    { label: 'Evaluación', path: 'evaluation', index: 2 },
    { label: 'Préstamo', path: 'loan', index: 3 },
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private archivoService: ArchivoService,
              private creditApplicationService: SolicitudCreditoService,
              private router: Router) { }

  ngOnInit() {
    this.showChildView = false;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.documentId = params['id'];
      this.creditApplicationService
        .getCreditApplicationByCode(this.documentId)
        .subscribe((response) => {
          this.creditApplicationService.solicitudCredito = response;
          this.showChildView = true;
        });
    });
  }

  save(): void {
    const solicitud = this.creditApplicationService.solicitudCredito;
    const solicitudCredito = new SolicitudCreditoRequest();
    solicitudCredito.CodigoInterbancario = solicitud.CodigoInterbancario;
    solicitudCredito.CodigoPrestamo = solicitud.PrestamoCodigo;
    solicitudCredito.CodigoSolCredito = solicitud.CodigoSolCredito;
    solicitudCredito.CodigoSubasta = solicitud.CodigoSubasta;
    solicitudCredito.DepartamentoSolicitanteId = solicitud.DepartamentoSolicitanteId;
    solicitudCredito.DireccionSolicitante = solicitud.DireccionSolicitante;
    solicitudCredito.DistritoSolicitanteId = solicitud.DistritoSolicitanteId;
    solicitudCredito.EsContratoGuardado  = solicitud.EsContratoCargado || false;
    solicitudCredito.EstadoSolicitudId = solicitud.EstadoSolicitudId;
    solicitudCredito.NombreEntidadId = solicitud.NombreEntidadId;
    solicitudCredito.NumeroCelular = solicitud.NumeroCelular;
    solicitudCredito.PaisSolicitanteId = solicitud.PaisSolicitanteId;
    solicitudCredito.ProvinciaSolicitanteId = solicitud.ProvinciaSolicitanteId;
    solicitudCredito.TipoCuentaId = solicitud.TipoCuentaId;

    console.log(solicitudCredito);
    const uploadFileList = this.creditApplicationService.solicitudCredito.ArchivoContrato || [];
    forkJoin(this.archivoService.uploadFile(uploadFileList),
             this.creditApplicationService.saveApplication(solicitudCredito))
      .subscribe((response) => { this.router.navigate(['credit-application/overview']); });
  }

  exit(): void {
    this.router.navigate(['solicitud/list']);
  }

}