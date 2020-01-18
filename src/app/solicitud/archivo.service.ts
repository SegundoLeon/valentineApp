import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ArchivoModel } from './archivo.model';
import { UploadFileModel } from './uploadFile.model';
import { EnviromentsConstants } from '../shared/constantes/enviroment.constants';
import { HostnameConstants } from '../shared/constantes/hostname.constants';
import { Utilities } from '../shared/services/utilities';

@Injectable()
export class ArchivoService {
    private T_ARCHIVO_ENDPOINT = 'Archivos';
    private BASE_URL: string = Utilities.buildRequestURL(
        HostnameConstants.VALENTINE_WEBAPI.host);
    private REQUEST_URL: string;
    private URL: string;

    constructor(private http: HttpClient) {
        this.REQUEST_URL = `${this.BASE_URL}${this.T_ARCHIVO_ENDPOINT}`;
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
