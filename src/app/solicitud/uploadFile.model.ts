import { BaseModel } from './base.model';
export class UploadFileModel extends BaseModel {
    container: string;
    name: string;
    file: string;
    extension: string;
    solicitudCreditoId: number;

    constructor() {
        super();
    }
}
