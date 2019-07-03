import { BaseModel } from './base.model';
export class ArchivoModel extends BaseModel {
    codigoArchivo: number;
    codigoSolCredito: number;
    rutaArchivo: string;
    constructor() {
        super();
    }
}
