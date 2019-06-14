import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Utilitarios } from '../shared/utilitarios';
import { HostnameConstants } from '../shared/constantes/hostname.constants';
import { RegistroPaso1Model } from './registroPaso1.model';
import { RegistroPaso2Model } from './registroPaso2.model';
import { ReniecConsultaModel } from './reniecConsulta.model';
import { ReniecRespuestaModel } from './reniecRespuesta.model';
import { CorreoRespuestaModel } from './correoRespuesta.model';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { BaseResponse, CreditApplication, CreditApplicationDTO, DetailProfitability,
  DetailProfitabilityRequest, DetailProfitabilityResponse, Parameter,
  ParameterDTO, Profitability, ProfitabilityDTO,
  SearchCreditApplicationDTO, SolicitudCredito, SolicitudCreditoRequest, UbigeoDTO} from './credit-request.model';



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

  constructor(private http: HttpClient) {
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

  // Utilizadas en credit-request

  getCreditApplication(creditApplication: SearchCreditApplicationDTO) {
    this.URL = `${this.URL_SOLICITUD}/SearchSolicitudCredito`;
    return this.http.post(this.URL, creditApplication);
  }

}
