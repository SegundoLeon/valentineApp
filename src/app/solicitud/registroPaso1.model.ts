import { BaseModel } from './base.model';

export class RegistroPaso1Model extends BaseModel {
  codigoSolCredito: number;
  nombreSolicitante: string;
  apellidoParternoSolicitante: string;
  apellidoMaternoSolicitante: string;
  fechaNacimiento: string;
  tipoDocumento: number;
  numeroDocumento: string;
  digitoVerificacion: string;
  genero: number;
  correoElectronico: string;
  numeroCelular: string;
  ingresosMensuales: number;
  gradoInstruccion: number;
  destinoCredito: number;
  estado: number;
  etapa: number;
  fechaRegistro: Date;
  puntuacionBuro: number;

  constructor() {
    super();
  }
}
