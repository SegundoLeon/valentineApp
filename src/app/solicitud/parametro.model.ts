import { BaseModel } from './base.model';

export class ParametroModel extends BaseModel {
  codigo: number;
  nombre: string;

  constructor() {
    super();
  }
}
