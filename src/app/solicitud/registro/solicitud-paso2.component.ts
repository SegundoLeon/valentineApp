import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ParametroModel } from '../parametro.model';
import { UbigeoModel } from '../ubigeo.model';
import { ParametroService } from '../parametro.service';
import { UbigeoService } from '../ubigeo.service';
import { EvaluacionService } from '../evaluacion.service';
import { RegistroPaso2Model } from '../registroPaso2.model';

import { SolicitudCreditoRequestF2Model } from '../solicitud-credito-request-f2.model';
import { SolicitudCreditoResponseF2Model } from '../solicitud-credito-response-f2.model';

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
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
//import { validateConfig } from '@angular/router/src/config';

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
  codigoSolicitud: string;
  solicitanteCasado = false;
  esPEP = false;
  paises: UbigeoModel[] = [];
  departamentos: UbigeoModel[] = [];
  provincias: UbigeoModel[] = [];
  distritos: UbigeoModel[] = [];
  plazos: ParametroModel[] = [];
  seguros: ParametroModel[] = [];
  estadosCiviles: ParametroModel[] = [];
  documentos: ParametroModel[] = [];
  tiposCuentas: ParametroModel[] = [];
  bancos: ParametroModel[] = [];
  registro = new SolicitudCreditoRequestF2Model();
  registroPaso2Formulario: FormGroup;   // Nombre del formulario en HTML
  mensajeError = '';
  mostrarMensaje = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private parametroService: ParametroService, private solicitudCreditoService: SolicitudCreditoService,
              private ubigeoService: UbigeoService, private evaluacionService: EvaluacionService) {
    this.codigoSolicitud = this.route.snapshot.paramMap.get('id');
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
    if (id.toString() === '32') {
      this.solicitanteCasado = true;
      console.log('aaaa' + id);
    } else {
      this.solicitanteCasado = false;
      console.log(id);
    }
    //console.log(this.solicitanteCasado.toString());
    //console.log(id);
  }

  private inicializarFormulario() {
    this.registroPaso2Formulario = this.formBuilder.group({
      cuotas: [null, [Validators.required]],
      tipoCuentaBancaria: [null, [Validators.required]],
      bancoCodigo: [null, [Validators.required]],
      codigoInterbancario: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(20), Validators.pattern('[0-9]*')]],

      pais: [null, [Validators.required]], //new FormControl(null, [Validators.required]),
      direccion: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      distrito: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      lugarTrabajo: [null, [Validators.required, Validators.maxLength(100)]],
      nombrePareja: [null, [Validators.required, Validators.maxLength(60)]],
      apellidoPaternoPareja: [null, [Validators.required, Validators.maxLength(60)]],
      apellidoMaternoPareja: [null, [Validators.required, Validators.maxLength(60)]],
      tipoDocumentoPareja: [null],
      numeroDocumentoPareja: [null],
      esPEP: false,
      cargoPEP: [null],
    });
  }

  private cargarCombos() {
    this.ubigeoService.getByPadreID(ParametroConstants.PAIS).subscribe(
      (result: UbigeoModel[]) => {this.paises = result;}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.ESTADOCIVIL).subscribe(
      (result: ParametroModel[]) => {this.estadosCiviles = result;}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.TIPODOCUMENTO).subscribe(
      (result: ParametroModel[]) => {this.documentos = result;}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.TIPOCUENTA).subscribe(
      (result: ParametroModel[]) => {this.tiposCuentas = result;}, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.BANCOS).subscribe(
      (result: ParametroModel[]) => {this.bancos = result;}, error => console.error(error), );
  }

  private registrarSegundoPaso(): void {
    this.mostrarMensaje = false;
    this.registro.cuotas = this.registroPaso2Formulario.value.cuotas;
    this.registro.tipoCuentaBancaria = this.registroPaso2Formulario.value.tipoCuentaBancaria;
    this.registro.bancoCodigo = this.registroPaso2Formulario.value.bancoCodigo;
    this.registro.codigoInterbancario = this.registroPaso2Formulario.value.codigoInterbancario;
    this.registro.prestatario.pais = this.registroPaso2Formulario.value.pais;
    this.registro.prestatario.direccion = this.registroPaso2Formulario.value.direccion;
    this.registro.prestatario.departamento = this.registroPaso2Formulario.value.departamento;
    this.registro.prestatario.provincia = this.registroPaso2Formulario.value.provincia;
    this.registro.prestatario.distrito = this.registroPaso2Formulario.value.distrito;
    this.registro.prestatario.estadoCivil = this.registroPaso2Formulario.value.estadoCivil;
    this.registro.prestatario.lugarTrabajo = this.registroPaso2Formulario.value.lugarTrabajo;
    this.registro.prestatario.esPep = this.registroPaso2Formulario.value.esPep;
    this.registro.prestatario.cargoPep = this.registroPaso2Formulario.value.cargoPep;

    if (this.solicitanteCasado) {
      this.registro.prestatario.nombrePareja = this.registroPaso2Formulario.value.nombrePareja;
      this.registro.prestatario.apellidoPaternoPareja = this.registroPaso2Formulario.value.apellidoPaternoPareja;
      this.registro.prestatario.apellidoMaternoPareja = this.registroPaso2Formulario.value.apellidoMaternoPareja;
      this.registro.prestatario.tipoDocumentoPareja = this.registroPaso2Formulario.value.tipoDocumentoPareja;
      this.registro.prestatario.numeroDocumentoPareja = this.registroPaso2Formulario.value.numeroDocumentoPareja;
    }

    this.solicitudCreditoService.registerSecondStep(this.codigoSolicitud, this.registro).subscribe(
      (respuesta: SolicitudCreditoResponseF2Model) => {
        console.log(respuesta);
        this.router.navigate(['/solicitud/resultado', this.codigoSolicitud]);
      }, error => console.error(error)
    );
  }

  navegar() {
    this.router.navigate(['/solicitud/resultado', this.codigoSolicitud]);
  }

}
