import { BaseModel } from './base.model';

export class Prestatario {
  pais: number;
  direccion: string;
  departamento: number;
  provincia: number;
  distrito: number;
  estadoCivil: number;
  lugarTrabajo: string;
  nombrePareja: string;
  apellidoPaternoPareja: string;
  apellidoMaternoPareja: string;
  tipoDocumentoPareja: number;
  numeroDocumentoPareja: string;
  esPep: number;
  cargoPep: string;
  constructor() {}
}

export class SolicitudCreditoRequestF2Model extends BaseModel {
  cuotas: number;
  tipoCuentaBancaria: number;
  bancoCodigo: number;
  codigoInterbancario: string;
  prestatario: Prestatario = new Prestatario();
  constructor() {
    super();
  }
}
