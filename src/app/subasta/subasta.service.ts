import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilitarios } from '../compartido/utilitarios';
import { HostnameConstants } from '../compartido/constantes/hostname.constants';
import { Subasta } from './subasta';
import { ReporteSubasta } from './reporteSubasta.model';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {
  private ENDPOINT  = 'T_Subasta';
  private URL_BASE = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
  private URL_SOLICITUD: string;
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL_SOLICITUD = `${this.URL_BASE}${this.ENDPOINT}`;
  }

  public agregarSubasta(modelo: Subasta) {
    this.URL = `${this.URL_SOLICITUD}`;
    return this.http.post(this.URL, modelo);
  }

  public obtenerReporteSubasta() {
    this.URL = `${this.URL_SOLICITUD}/GetReportSubastas`;
    return this.http.get(this.URL);
  }

}
