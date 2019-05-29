import { BaseModel } from './base.model';

export class ReniecConsultaModel extends BaseModel {
  NumeroDni: string;
  DigitoVerificacion: string;
  Nombres: string;
  PrimerNombre: string;
  SegundoNombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;

  constructor() {
    super();
  }
}
