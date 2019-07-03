import { Component, OnInit } from '@angular/core';
import { Parameter, SolicitudCredito, UbigeoDTO } from '../../credit-application.model';
import { SolicitudCreditoService } from '../../solicitud-credito.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  public folders: any[];
  public solicitud: SolicitudCredito = new SolicitudCredito();
  public uploadFileList: any = [];
  public loadingIndicator: any;
  public fileType: any;
  public fileExtension: any;
  public fileName: any;
  public file: any;
  public formularios: any = {};

  constructor(private creditApplicationService: SolicitudCreditoService) { }

  ngOnInit() {
    this.solicitud = this.creditApplicationService.solicitudCredito;
    this.creditApplicationService
      .getFilesByApplicationCode(this.solicitud.CodigoSolCredito)
      .subscribe((response) => {
        this.folders = response;
      });

      this.formularios = {
        enabled: this.solicitud.EstadoSolicitudId === 55 && (this.solicitud.EstadoSubastaId === 67 ||  this.solicitud.EstadoSubastaId === 71) ||
                 this.solicitud.EstadoSolicitudId === 63 && (this.solicitud.EstadoSubastaId === 69 ||  this.solicitud.EstadoSubastaId === 72) ,

      };
  }

  onFileUpload($event): void {
    this.uploadFileList = [];
    this.solicitud.EsContratoCargado = false;
    this.loadingIndicator = true;
    if ($event.target.files[0]) {
      this.fileType = $event.target.files[0].type;
      this.fileExtension = String($event.target.files[0].name).substring(String($event.target.files[0].name).lastIndexOf('.') + 1);
      this.fileName = $event.target.files[0].name;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString($event.target.files[0]);
    }
  }

  _handleReaderLoaded(readerEvt): void {
      const binaryString = readerEvt.target.result;
      this.file = btoa(binaryString);
      this.file = `data:${this.fileType};base64,${this.file}`;
      const uploadFile: any = {};
      uploadFile.name = this.fileName;
      uploadFile.container = 'documentos';
      uploadFile.file = this.file;
      uploadFile.extension = this.fileExtension;
      uploadFile.solicitudCreditoId = this.solicitud.CodigoSolCredito;
      this.uploadFileList.push(uploadFile);
      this.uploadFileList = [...this.uploadFileList];
      this.loadingIndicator = false;

      this.solicitud.ArchivoContrato = this.uploadFileList;
      this.solicitud.EsContratoCargado = true;
  }

}
