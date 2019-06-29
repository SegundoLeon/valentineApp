import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Solicitud {
    constructor(
      public code: string | number,
      public name: string,
      public documentNumber: string,
      public amount: number,
      public date: Date,
      public period: number,
      public status: string,
      public penTea: number,
      public finalTea: number,
    ) { }
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdapter implements Adapter<Solicitud> {

adapt(item: any): Solicitud {
  return new Solicitud(
    item.CodigoSolCredito,
    item.NombreCompleto,
    item.NumeroDocumento,
    item.MontoSolicitado,
    item.FechaRegistro,
    item.PlazoPrestamo,
    item.EstadoDescripcion,
    item.TeaAsignada ? item.TeaAsignada / 100 : null,    
    item.TeaFinal ? item.TeaFinal / 100 : null,   
    );
}
}

