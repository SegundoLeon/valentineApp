import { BaseModel } from './base.model';

export class Prestatario {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  tipoDocumento: number;
  numeroDocumento: string;
  digitoVerificacion: string;
  genero: number;
  correoPersonal: string;
  telefonoCelular: string;
  gradoInstruccion: number;
  tipoActividad: number;
  tipoOcupacion: number;
  constructor() {}
}

export class SolicitudCreditoRequestF1Model extends BaseModel{
  montoPrestamo: number;
  ingresoMensual: number;
  destinoPrestamo: number;
  destinoDetalle: string;
  prestatario: Prestatario = new Prestatario();
  constructor() {
    super();
  }
}


