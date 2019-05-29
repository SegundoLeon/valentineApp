import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilitarios } from '../compartido/utilitarios';
import { HostnameConstants } from '../compartido/constantes/hostname.constants';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  private ENDPOINT  = 'T_Participacion';
  private URL_BASE = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
  private URL_SOLICITUD: string;
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL_SOLICITUD = `${this.URL_BASE}${this.ENDPOINT}`;
  }

  public obtenerReporteSubastaAutomatica(fechaDesde: string, fechaHasta: string) {
    this.URL = `${this.URL_SOLICITUD}/?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
    console.log(this.URL);
    return this.http.get(this.URL);
  }


}
