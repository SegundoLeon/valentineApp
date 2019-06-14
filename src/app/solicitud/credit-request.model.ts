export class Parameter {
    id: number;
    name: string;
    parent: number;
  }
  
  export class ParameterDTO {
    ID: number;
    Nombre: string;
    Padre: number;
  }
  
  export class CreditApplication {
    code: string | number;
    name: string;
    documentNumber: string;
    amount: number;
    date: Date;
    period: number;
    status: string;
    penTea: number;
    finalTea: number;
  }
  
  export class BaseResponse<T> {
    data: T[];
    total: number;
  }
  
  export class CreditApplicationDTO {
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
  
  export class SearchCreditApplicationDTO {
    NumeroDocumento: string = '';
    Solicitante: string = '';
    EstadoId: string = null;
    DestinoCreditoId: string = null;
    FechaDesde: Date = null;
    FechaHasta: Date = null;
    Paginacion?: PaginationDTO = new PaginationDTO();
  }
  
  export class PaginationDTO {
    Total: number = 0;
    Page: number = 1;
    PageSize: number = 10;
  }
  
  export class Schedule {
    id?: string |number;
    amount: number;
    expiryDate: Date;
    status: string;
    fee: number;
    interest: number;
    expense: number;
    payment: number;
    paymentDate: Date;
    arrears: number;
    debt: number;
  }
  
  export class Cuotas {
    CodigoCuota: number;
    CuotaOriginal: number;
    EstadoId: number;
    EstadoNombre: string;
    FechaPago: Date;
    GastosAdministrativos: number;
    InteresMoratorio: number;
    Monto: number;
    Pago: number;
    Vencimiento: Date;
  }
  
  export class UbigeoDTO {
    Nombre: string;
    Ubigeo_ID: number;
    Ubigeo_Padre: number;
  }
  
  export class SolicitudCreditoRequest {
    CodigoSolCredito: string;
    CodigoInterbancario: string;
    CodigoSubasta: number;
    CodigoPrestamo: number;
    DepartamentoSolicitanteId: number;
    DireccionSolicitante: string;
    DistritoSolicitanteId: number;
    EsContratoGuardado: boolean;
    EstadoSolicitudId: number;
    NombreEntidadId: number;
    NumeroCelular: string;
    PaisSolicitanteId: number;
    ProvinciaSolicitanteId: number;
    TipoCuentaId: number;
  }
  
  export class SolicitudCredito {
    ApellidoMaternoConyuge: string;
    ApellidoMaternoSolicitante: string;
    ApellidoPaternoConyuge: string;
    ApellidoPaternoSolicitante: string;
    AreaActividadId: number;
    ArchivoContrato: any[];
    CargoPep: any;
    CodigoInterbancario: string;
    CodigoSolCredito: string;
    CorreoElectronico: string;
    CodigoSubasta: number;
    CodigoPrestamo: number;
    Cuotas: Cuotas[];
    DepartamentoSolicitanteId: number;
    DestinoCreditoId: number;
    DetalleMotivo: string;
    DigitoVerificacion: string;
    DireccionSolicitante: string;
    DireccionVerificada: string;
    DistritoSolicitanteId: number;
    DniVerificado: string;
    EsContratoCargado: boolean;
    EsPep: boolean;
    EstadoCivilId: number;
    EstadoSolicitudId: number;
    EstadoSubastaId: number;
    FechaNacimiento: Date | string;
    GeneroId: number;
    GradoInstruccionId: number;
    IngresoMensual: number;
    IngresoVerificado: any;
    LugarTrabajo: string;
    MontoRecaudado: number;
    MontoSolicitado: number;
    NombreConyuge: string;
    NombreEntidadId: number;
    NombreSolicitante: string;
    NumeroCelular: string;
    NumeroDocumento: string;
    NumeroDocumentoConyuge: string;
    OcupacionId: number;
    PaisSolicitanteId: number;
    PerfilAsignadoId: number;
    PerfilAsignadoNombre: string;
    PlazoPrestamo: number;
    PrestamoCodigo: number;
    ProvinciaSolicitanteId: number;
    PuntuacionBuro: number;
    SeguroDesgravamenId: number;
    TeaAsignada: number;
    TipoCuentaId: number;
    TipoDocumentoConyugeId: number;
    TipoDocumentoId: number;
  }
  
  export class Profitability {
    period: string;
    capital: number;
    interest: number;
    mora: number;
    commission: number;
    repayment: number;
    fee: number;
  }
  
  export class ProfitabilityDTO {
    Anio: number;
    Capital: number;
    Comision: number;
    Cuotas: number;
    Interes: number;
    Mes: number;
    Moras: number;
    RetornoNeto: number;
  }
  
  export class DetailProfitabilityRequest {
    CodigoInversor: string;
    Anio: number;
    Mes: number;
    Paginacion: PaginationDTO = new PaginationDTO();
  }
  
  export class DetailProfitabilityResponse {
    Capital: number;
    Comision: number;
    Cuota: string;
    CuotaPrestamo: number;
    EstadoId: number;
    EstadoNombre: string;
    Interes: number;
    Monto: number;
    Moras: number;
    RetornoNeto: number;
    Tasa: number;
    Vence: Date;
  }
  
  export class DetailProfitability {
    loanFee: number;
    capital: number;
    interest: number;
    mora: number;
    commission: number;
    repayment: number;
    fee: string;
    expiredDate: Date;
    status: string;
    amount: number;
    rate: number;
  }
  