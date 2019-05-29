import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Utilitarios } from '../compartido/utilitarios';
import { HostnameConstants } from '../compartido/constantes/hostname.constants';
import { RegistroPaso1Model } from './registroPaso1.model';
import { RegistroPaso2Model } from './registroPaso2.model';
import { ReniecConsultaModel } from './reniecConsulta.model';
import { ReniecRespuestaModel } from './reniecRespuesta.model';
import { CorreoRespuestaModel } from './correoRespuesta.model';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudCreditoService {
  private ENDPOINT  = 'T_SolicitudCredito';
  private URL_BASE = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
  private URL_SOLICITUD: string;
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL_SOLICITUD = `${this.URL_BASE}${this.ENDPOINT}`;
  }

  // Simula validar datos en la RENIEC
  public validarDatosReniec(model: ReniecConsultaModel): Observable<any> {
    return this.http.post(HostnameConstants.RENIEC_WEBAPI.host, model)
          .pipe(catchError(this.manejoError));
          //tap(response => console.log(response)), map(response => response.toString),
  }

  public manejoError(error: HttpErrorResponse) {
    return throwError(error.message || 'Error del servidor');
  }

  // Verifica si el solicitante tiene alguna solicitud de credito pendiente
  public validarSolicitudExistente(DNI: string) {
    this.URL = `${this.URL_SOLICITUD}/ValidarSolicitudExistente/${DNI}/DNI`;
    return this.http.get(this.URL);
  }

  // Envia correo electronico a los solicitantes
  public enviarMail(model: CorreoRespuestaModel) {
    this.URL = `${this.URL_SOLICITUD}/EnviarMail`;
    return this.http.post(this.URL, model);
  }

  // Permite el primer paso del proceso de solicitud de credito
  public registerFirstStep(model: RegistroPaso1Model) {
    this.URL = `${this.URL_SOLICITUD}`;
    return this.http.post(this.URL, model);
  }

  // Permite el segundo paso del proceso de solicitud de credito
  public registerSecondStep(id: number, model: RegistroPaso2Model) {
    this.URL = `${this.URL_SOLICITUD}/${id}`;
    return this.http.put(this.URL, model);
  }

}
