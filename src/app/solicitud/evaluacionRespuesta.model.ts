import { BaseModel } from './base.model';

export class EvaluacionRespuestaModel extends BaseModel {
  Resultado: string;
  PuntuacionBuro: number;

  constructor() {
    super();
  }
}
