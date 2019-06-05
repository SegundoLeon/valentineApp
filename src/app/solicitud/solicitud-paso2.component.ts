import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ParametroModel } from './parametro.model';
import { UbigeoModel } from './ubigeo.model';
import { ParametroService } from './parametro.service';
import { UbigeoService } from  './ubigeo.service';
import { EvaluacionService } from './evaluacion.service';
import { RegistroPaso1Model } from './registroPaso1.model';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SolicitudCreditoService } from './solicitud.service';
import { ParametroConstants } from './parametro.constants';
import { ReniecRespuestaModel } from './reniecRespuesta.model';
import { ReniecConsultaModel } from './reniecConsulta.model';
import { CorreoRespuestaModel } from './correoRespuesta.model';
import { HistorialRespuestaModel } from './historialRespuesta.model';
import { EvaluacionConsultaModel } from './evaluacionConsulta.model';
import { EvaluacionRespuestaModel } from './evaluacionRespuesta.model';
import { EstadoSolicitudCreditoConstants } from './estadoSolicitudCredito.constants';
import { EtapasSolicitudCreditoConstants } from './etapasSolicitudCredito.constants';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { RegistroPaso2Model } from './registroPaso2.model';


@Component({
  selector: 'app-solicitud-paso2',
  templateUrl: './solicitud-paso2.component.html',
  styleUrls: ['./solicitud-paso2.component.scss']
})
export class SolicitudPaso2Component implements OnInit {
  codigoSolicitante: string;
  solictanteCasado: boolean = false;
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
              private dialog: MatDialog, private parametroService: ParametroService,
              private ubigeoService: UbigeoService
              
              ) {
    this.codigoSolicitante = this.route.snapshot.paramMap.get('id');
    this.cargarCombos();
   }

   ngOnInit() {
    this.inicializarFormulario();
  }

  paisChange(id: any): void {
    console.log("ingresamos al pais");
    this.ubigeoService.getByPadreID(id).subscribe(
        (result: UbigeoModel[]) => { this.departamentos = result; }, error => console.error(error));
  }

  departamentoChange(id: number): void {
      this.ubigeoService.getByPadreID(id).subscribe(
          (result: UbigeoModel[]) => { this.provincias = result;}, error => console.error(error));
  }

  estadoCivilChange(id: any): void {
      if (id === '1: 18') {
          this.solictanteCasado = true;
      }
      else {
          this.solictanteCasado = false;
      }
  }

  provinciaChange(id: number): void {
      this.ubigeoService.getByPadreID(id).subscribe(
          (result: UbigeoModel[]) => { this.distritos = result;}, error => console.error(error));
  }

  private inicializarFormulario() {
    this.registroPaso2Formulario = this.formBuilder.group({
      direccionSolicitante: [null, [Validators.required]],
      pais: new FormControl(null, [Validators.required]),
      departamento: [null],
      provincia: [null],
      distrito: [null],
      montoSolicitado: [null],
      plazoPrestamo: [null],
      seguroDesgravamen: [null],
      estadoCivil: [null],
      detalleMotivo: [null, [Validators.required]],
      apellidoPaternoConyuge: [null, [Validators.required]],
      apellidoMaternoConyuge: [null, [Validators.required]],
      nombresConyuge: [null, [Validators.required]],
      tipoDocumentoConyuge: [null],
      numeroDocConyuge: new FormControl(),
      tipoActividad: [null],
      rubroActividad: [null],
      lugarTrabajo: new FormControl(null, [Validators.required]),
      tipoCuenta: [null],
      banco: [null],
      cuentaInterbancaria: new FormControl(null, [Validators.required]),
      esPEP: [null],
      cargoPEP: [null],

      //numeroDocumento: [null, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]*')]],
      //digitoVerificacion: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      //numeroCelular: [null, [Validators.pattern('[0-9]*')]],
    });
  }

  private cargarCombos() {
    console.log("antes de cargar combos");
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

  }

  navegar() {
    this.router.navigate(['/solicitud']);
  }

}
