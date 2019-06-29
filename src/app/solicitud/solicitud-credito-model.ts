// Estructura de respuesta desde el servicio
export class SolicitudResponse {
    CodigoSolCredito: number;
    NombreCompleto: string;
    NumeroDocumento: string;
    MontoSolicitado: number;
    FechaRegistro: Date;
    PlazoPrestamo: number;
    EstadoId: number;
    EstadoDescripcion: string;
    TeaAsignada: number;
    TeaFinal: number;
}

export class Lista<T> {
    data: T[];
    total: number;
  }

// Se desea retornar esta clase 
export class SolicitudResponseApp {
    code: string | number;
    name: string;
    documentNumber: string;
    amount: number;
    date: Date;
    period: number;
    status: string;
    penTea: number;
    finalTea: number;

    constructor(solicitudResponse: any) {
      this.amount = solicitudResponse.MontoSolicitado;
      this.code = solicitudResponse.CodigoSolCredito;
      this.date = solicitudResponse.FechaRegistro;
      this.documentNumber = solicitudResponse.NumeroDocumento;
      this.finalTea = solicitudResponse.TeaFinal ? solicitudResponse.TeaFinal / 100 : null;
      this.name = solicitudResponse.NombreCompleto;
      this.penTea = solicitudResponse.TeaAsignada ? solicitudResponse.TeaAsignada / 100 : null;
      this.period = solicitudResponse.PlazoPrestamo;
      this.status = solicitudResponse.EstadoDescripcion;
    }
  }

export class SolicitudRequest {
    NumeroDocumento: string = '';
    Solicitante: string = '';
    EstadoId: string = null;
    DestinoCreditoId: string = null;
    FechaDesde: Date = null;
    FechaHasta: Date = null;
    Paginacion?: SolicitudPaginacion = new SolicitudPaginacion();
  }

  export class SolicitudPaginacion {
    Total: number = 0;
    Page: number = 1;
    PageSize: number = 10;
  }

