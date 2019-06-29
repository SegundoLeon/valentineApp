import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase, HttpParams, HttpHeaders } from '@angular/common/http';
import { Utilitarios } from '../shared/utilitarios';
import { HostnameConstants } from '../shared/constantes/hostname.constants';
import { RegistroPaso1Model } from './registroPaso1.model';
import { RegistroPaso2Model } from './registroPaso2.model';
import { ReniecConsultaModel } from './reniecConsulta.model';
import { ReniecRespuestaModel } from './reniecRespuesta.model';
import { CorreoRespuestaModel } from './correoRespuesta.model';
import { Observable, Subject, throwError } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

import { SolicitudRequest, SolicitudResponse, SolicitudResponseApp, Lista } from './solicitud-credito-model';

import { BaseResponse, CreditApplication, DetailProfitability,  //CreditApplicationDTO
  DetailProfitabilityRequest, DetailProfitabilityResponse, Parameter,
  ParameterDTO, Profitability, ProfitabilityDTO,
  SearchCreditApplicationDTO, SolicitudCredito, SolicitudCreditoRequest, UbigeoDTO} from './credit-request.model';
import { Solicitud, SolicitudAdapter } from './solicitud-model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudCreditoService {
  private SOLICITUDCREDITO  = 'T_SolicitudCredito';
  private PARAMETRO = 'T_Parametro';
  private UBIGEO = 'T_Ubigeo';
  private INGRESO = 'T_Ingreso';
  private ARCHIVO = 'T_Archivo';
  private URL_BASE = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
  private URL_SOLICITUD: string;
  private URL: string;

  constructor(private router: Router, private http: HttpClient,
              private solicitudAdapter: SolicitudAdapter) {
    this.URL_SOLICITUD = `${this.URL_BASE}${this.SOLICITUDCREDITO}`;

  }

  // Simula validar datos en la RENIEC
  public validarDatosReniec(model: ReniecConsultaModel): Observable<any> {
    return this.http.post(HostnameConstants.RENIEC_WEBAPI.host, model)
          .pipe(catchError(this.manejoError));
          //tap(response => console.log(response)), map(response => response.toString),
  }

  private manejoError(respuestaError: HttpErrorResponse) {
    if(respuestaError.error instanceof ErrorEvent) {
      console.error('Error en el cliente: ', respuestaError.error.message);
    } else {
      console.error('Error en el servidor: ', respuestaError);
    }
    return throwError('Hay un problema con el servicio. Estaremos trabajando para resolver el problema.')
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
  public registerSecondStep(id: number, model: RegistroPaso2Model): Observable<any> {
    this.URL = `${this.URL_SOLICITUD}/${id}`;
    return this.http.put(this.URL, model).pipe(catchError(this.manejoError));
  }

  getCreditApplication(solicitudRequest: SolicitudRequest): Observable<Solicitud[]> {
    this.URL = `${this.URL_SOLICITUD}/SearchSolicitudCredito`;
    return this.http.post<any[]>(this.URL, solicitudRequest).pipe(
      map(res => res['data'].map(item => this.solicitudAdapter.adapt(item))),
    );
  }

  /*
  getCreditApplication(solicitudRequest: SolicitudRequest): Observable<Solicitud[]> {
    this.URL = `${this.URL_SOLICITUD}/SearchSolicitudCredito`;
    return this.http.post<any[]>(this.URL, solicitudRequest).pipe(
      map((rpta: any[]) => rpta.map(item => this.solicitudAdapter.adapt(item))),
      );
  }
*/



  public goEdit(application: CreditApplication): void {
    this.router.navigate(['credit-application/edit', application.code, 'general']);
  }


}
