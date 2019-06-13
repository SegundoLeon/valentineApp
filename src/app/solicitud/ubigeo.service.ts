import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { HostnameConstants } from '../shared/constantes/hostname.constants';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { UbigeoModel } from './ubigeo.model';
import { Utilitarios } from '../shared/utilitarios';

@Injectable({
    providedIn: 'root'
})
export class UbigeoService {
    private ENDPOINT: string = 'T_Ubigeo';
    private URL_BASE: string = Utilitarios.crearURLSolicitud(HostnameConstants.VALENTINE_WEBAPI.host);
    private URL_SOLICITUD: string;
    private URL: string;

    constructor(private http: HttpClient) {
        this.URL_SOLICITUD = `${this.URL_BASE}${this.ENDPOINT}`;
    }


    //: Observable<UbigeoModel[]> 
    public getByPadreID(padreId: number){
        this.URL = `${this.URL_SOLICITUD}/${padreId}`;
        return this.http.get(this.URL);        
    }
}