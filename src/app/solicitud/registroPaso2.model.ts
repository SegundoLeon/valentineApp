import { BaseModel } from './base.model';

export class RegistroPaso2Model extends BaseModel {
  codigoSolCredito: number;
  direccionSolicitante: string;
  //codigoPostalSolicitante: string;
  pais: number;
  departamento: number;
  provincia: number;
  distrito: number;
  montoSolicitado: number;
  plazoPrestamo: number;
  seguroDesgravamen: string;
  estadoCivil: number;
  detalleMotivo: string;
  apellidoPaternoConyuge: string;
  apellidoMaternoConyuge: string;
  nombresConyuge: string;
  tipoDocumentoConyuge: number;
  numeroDocConyuge: string;
  tipoActividad: number;
  rubroActividad: number;
  lugarTrabajo: string;
  tipoCuenta: number;
  banco: number;
  cuentaInterbancaria: string;
  esPEP: boolean;
  cargoPEP: string;
  etapa: number;
  estado: number;

  constructor() {
    super();
  }
}