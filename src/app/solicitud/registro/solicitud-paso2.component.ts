import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ParametroModel } from '../parametro.model';
import { UbigeoModel } from '../ubigeo.model';
import { ParametroService } from '../parametro.service';
import { UbigeoService } from  '../ubigeo.service';
import { EvaluacionService } from '../evaluacion.service';
import { RegistroPaso2Model } from '../registroPaso2.model';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SolicitudCreditoService } from '../solicitud-credito.service';
import { ParametroConstants } from '../parametro.constants';
import { ReniecRespuestaModel } from '../reniecRespuesta.model';
import { ReniecConsultaModel } from '../reniecConsulta.model';
import { CorreoRespuestaModel } from '../correoRespuesta.model';
import { HistorialRespuestaModel } from '../historialRespuesta.model';
import { EvaluacionConsultaModel } from '../evaluacionConsulta.model';
import { EvaluacionRespuestaModel } from '../evaluacionRespuesta.model';
import { EstadoSolicitudCreditoConstants } from '../estadoSolicitudCredito.constants';
import { EtapasSolicitudCreditoConstants } from '../etapasSolicitudCredito.constants';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { validateConfig } from '@angular/router/src/config';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-solicitud-paso2',
  templateUrl: './solicitud-paso2.component.html',
  styleUrls: ['./solicitud-paso2.component.scss']
})
export class SolicitudPaso2Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  codigoSolicitante: number;
  solictanteCasado: boolean = false;
  esPEP: boolean = false;
  paises: UbigeoModel[] = [];
  departamentos: UbigeoModel[] = [];
  provincias: UbigeoModel[] = [];
  distritos: UbigeoModel[] = [];
  plazos: ParametroModel[] = [];
  seguros: ParametroModel[] = [];
  estadosCiviles: ParametroModel[] = [];
  actividades: ParametroModel[] = [];
  rubrosActividades: ParametroModel[] = [];
  documentos: ParametroModel[] = [];
  tiposCuentas: ParametroModel[] = [];
  bancos: ParametroModel[] = [];
  registroPaso2Model: RegistroPaso2Model = new RegistroPaso2Model();
  registroPaso2Formulario: FormGroup;
  mensajeError = '';
  mostrarMensaje = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private parametroService: ParametroService, private solicitudCreditoService: SolicitudCreditoService, 
              private ubigeoService: UbigeoService, private evaluacionService: EvaluacionService                      
              ) {
    this.codigoSolicitante = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCombos();
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  paisChange(id: any): void {
    this.ubigeoService.getByPadreID(id).subscribe(
      (result: UbigeoModel[]) => { this.departamentos = result; }, error => console.error(error));
  }

  departamentoChange(id: number): void {
    this.ubigeoService.getByPadreID(id).subscribe(
      (result: UbigeoModel[]) => { this.provincias = result;}, error => console.error(error));
  }

  provinciaChange(id: number): void {
    this.ubigeoService.getByPadreID(id).subscribe(
      (result: UbigeoModel[]) => { this.distritos = result;}, error => console.error(error));
  }

  estadoCivilChange(id: any): void {
    if (id.toString() === '18') {
      this.solictanteCasado = true;
    }
    else {
      this.solictanteCasado = false;
    }
  }

  private inicializarFormulario() {
    this.registroPaso2Formulario = this.formBuilder.group({
      pais: [null, [Validators.required]], //new FormControl(null, [Validators.required]),
      direccionSolicitante: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      distrito: [null, [Validators.required]],
      montoSolicitado: [null, [Validators.required, Validators.min(2000), Validators.max(30000), Validators.pattern('[0-9]*')]],
      plazoPrestamo: [null, [Validators.required]],
      seguroDesgravamen: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      detalleMotivo: [null, [Validators.required, Validators.maxLength(120)]],
      nombresConyuge: [null, [Validators.required, Validators.maxLength(60)]],      
      apellidoPaternoConyuge: [null, [Validators.required, Validators.maxLength(60)]],
      apellidoMaternoConyuge: [null, [Validators.required, Validators.maxLength(60)]],
      tipoDocumentoConyuge: [null],
      numeroDocConyuge: [null],
      tipoActividad: [null, [Validators.required]],
      rubroActividad: [null, [Validators.required]],
      lugarTrabajo: [null, [Validators.required, Validators.maxLength(100)]],
      tipoCuenta: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      cuentaInterbancaria: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(20), Validators.pattern('[0-9]*')]],
      esPEP: false,
      cargoPEP: [null],
    });
  }

  private cargarCombos() {
    this.ubigeoService.getByPadreID(ParametroConstants.PAIS).subscribe(
      (result: UbigeoModel[]) => {this.paises = result;}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.SEGURO).subscribe(
      (result: ParametroModel[]) => {this.seguros = result}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.ESTADOCIVIL).subscribe(
      (result: ParametroModel[]) => {this.estadosCiviles = result}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.TIPOACTIVIDAD).subscribe(
      (result: ParametroModel[]) => {this.actividades = result}, error => console.error(error), ); 
    this.parametroService.getByPadreID(ParametroConstants.RUBROACTIVIDAD).subscribe(
      (result: ParametroModel[]) => {this.rubrosActividades = result}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.TIPODOCUMENTO).subscribe(
      (result: ParametroModel[]) => {this.documentos = result}, error => console.error(error), );  
    this.parametroService.getByPadreID(ParametroConstants.TIPOCUENTA).subscribe(
      (result: ParametroModel[]) => {this.tiposCuentas = result}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.BANCOS).subscribe(
      (result: ParametroModel[]) => {this.bancos = result}, error => console.error(error), );
  }

  private registrarSegundoPaso(): void {
    var montoSolicitado = this.registroPaso2Formulario.value.montoSolicitado;
    if (montoSolicitado < 2000 || montoSolicitado > 30000 ) {
      this.mostrarMensaje = true;
      this.mensajeError = 'El monto a solicitar debe estar entre S/ 2,000 y S/ 30,000)';
      return;      
    }

    // Si el solicitante es casado evaluamos a su conyugue en nuestro Modelo de Riesgo
    if(this.solictanteCasado) {

      var evaluacionConsultaModel: EvaluacionConsultaModel = new EvaluacionConsultaModel();
      evaluacionConsultaModel.NumeroDni = this.registroPaso2Formulario.value.numeroDocConyuge;
      evaluacionConsultaModel.DigitoVerificacion = '';
      evaluacionConsultaModel.ApellidoPaterno = this.registroPaso2Formulario.value.apellidoPaternoConyuge;
      evaluacionConsultaModel.ApellidoMaterno = this.registroPaso2Formulario.value.apellidoMaternoConyuge;
      evaluacionConsultaModel.Nombres = this.registroPaso2Formulario.value.nombresConyuge;
      evaluacionConsultaModel.Parentesco = 'C'; // Es el conyuge

      this.evaluacionService.obtenerEvaluacionRiesgo(evaluacionConsultaModel).subscribe(
        (result: EvaluacionRespuestaModel) => {
          if (result.Resultado === 'rechazado') {
            //this.storageManager.deleteData(); // Borra informacion del cookie
            this.router.navigate([`/inicio`]); }
          else {
            // Paso la evaluacion de nuestro Modelo de Riesgos
            console.log("Evaluacion exitosa de la conyuge");
            this.registroPaso2Model.setAll(this.registroPaso2Formulario.value);
            this.registroPaso2Model.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
            this.registroPaso2Model.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
            //console.log('Datos a grabar: ' + this.registroPaso2Model.toString());
            this.solicitudCreditoService.registerSecondStep(this.codigoSolicitante, this.registroPaso2Model).subscribe(
              (registerSecondStepModelResult: RegistroPaso2Model) => {
                //var localStorageModel: LocalStorageModel = new LocalStorageModel();
                //localStorageModel.solicitudCreditoId = this.id;
                //localStorageModel.step = 3;
                //this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                this.router.navigate([`/solicitud/exito`]);
              }, error => console.error(error)
            );

            
          }
        },
        error => console.error(error),
      );
    }
  }

  navegar() {
    this.router.navigate(['/solicitud']);
  }

}
