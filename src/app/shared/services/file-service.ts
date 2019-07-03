import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArchivoModel  } from '../../solicitud/archivo.model';
import { UploadFileModel } from '../../solicitud/uploadFile.model';
import { EnviromentsConstants } from '../constantes/enviroment.constants';
import { HostnameConstants } from '../constantes/hostname.constants';
import { HttpClient } from '@angular/common/http';
import { Utilitarios } from '../utilitarios';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private T_ARCHIVO_ENDPOINT  = 'T_Archivo';
  private URL_BASE = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
  private REQUEST_URL: string;
  private URL: string;

  constructor(private http: HttpClient) {
    this.REQUEST_URL = `${this.URL_BASE}${this.T_ARCHIVO_ENDPOINT}`;
  }

  public uploadFile(model: UploadFileModel[]): Observable<UploadFileModel[]> {
    this.URL = `${this.REQUEST_URL}`;
    return this.http.put<UploadFileModel[]>(this.URL, model);
  }

  public saveFile(model: ArchivoModel): Observable<ArchivoModel> {
    this.URL = `${this.REQUEST_URL}`;
    return this.http.post<ArchivoModel>(this.URL, model);
  }

}
