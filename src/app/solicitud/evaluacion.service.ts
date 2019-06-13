import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EvaluacionConsultaModel } from './evaluacionConsulta.model';
import { HostnameConstants } from '../shared/constantes/hostname.constants';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
    private URL: string;

    constructor(private http: HttpClient) {
      this.URL = HostnameConstants.EVALUAR_WEBAPI.host;
    }

    public obtenerEvaluacionRiesgo(model: EvaluacionConsultaModel) {
        this.URL = `${this.URL}`;
        return this.http.post(this.URL, model);
    }
}
