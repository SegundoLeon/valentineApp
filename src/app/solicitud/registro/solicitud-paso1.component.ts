import { Component, OnInit } from '@angular/core';
import { ParametroModel } from '../parametro.model';
import { ParametroService } from '../parametro.service';
import { EvaluacionService } from '../evaluacion.service';

//Referencia al modelo anterior para grabar la solicitud
//import { RegistroPaso1Model } from '../registroPaso1.model';
import { SolicitudCreditoRequestF1Model } from '../solicitud-credito-request-f1.model';
import { SolicitudCreditoResponseF1Model } from '../solicitud-credito-response-f1.model';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SolicitudCreditoService } from '../solicitud-credito.service';

import { ParametroConstants } from '../parametro.constants';
import { ReniecRespuestaModel } from '../reniecRespuesta.model';
import { ReniecConsultaModel } from '../reniecConsulta.model';
import { CorreoRespuestaModel } from '../correoRespuesta.model';
import { HistorialRespuestaModel } from '../historialRespuesta.model';
import { Router } from '@angular/router';
import { EvaluacionConsultaModel } from '../evaluacionConsulta.model';
import { EvaluacionRespuestaModel } from '../evaluacionRespuesta.model';
import { EstadoSolicitudCreditoConstants } from '../estadoSolicitudCredito.constants';
import { EtapasSolicitudCreditoConstants } from '../etapasSolicitudCredito.constants';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-solicitud-paso1',
  templateUrl: './solicitud-paso1.component.html',
  styleUrls: ['./solicitud-paso1.component.scss']
})
export class SolicitudPaso1Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  documentos: ParametroModel[] = [];
  generos: ParametroModel[] = [];
  grados: ParametroModel[] = [];
  destinos: ParametroModel[] = [];

  productId: number;
  registroPaso1Formulario: FormGroup;   // Nombre del formulario en HTML
  mensajeError = '';
  mostrarMensaje = false;
  fechaDate: Date;
  fechaString: string;
  //Adicional
  actividades: ParametroModel[] = [];
  rubrosActividades: ParametroModel[] = [];
  registro = new SolicitudCreditoRequestF1Model();

  constructor(private formBuilder: FormBuilder, private parametroService: ParametroService,
              private solicitudCreditoService: SolicitudCreditoService, private router: Router,
              private evaluacionService: EvaluacionService, private dialog: MatDialog,
              private location: Location) {
    this.cargarCombos();
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.registroPaso1Formulario = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidoPaterno: [null, Validators.required],
      apellidoMaterno: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: [null, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]*')]],
      digitoVerificacion: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      genero: [null, [Validators.required]],
      correoPersonal: [null, [Validators.required, Validators.email]],
      telefonoCelular: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      gradoInstruccion: [null, [Validators.required]],
      tipoActividad: [null, [Validators.required]],
      tipoOcupacion: [null, [Validators.required]],

      montoPrestamo: [null, [Validators.required, Validators.min(2000), Validators.max(30000), Validators.pattern('[0-9]*')]],
      ingresoMensual: [null, [Validators.required]],
      destinoPrestamo: [null, [Validators.required]],
      destinoDetalle: [null, [Validators.required, Validators.maxLength(120)]],

      aceptoTerminos: [null, [Validators.required]],
    });
  }

  private cargarCombos() {
    this.parametroService.getByPadreID(ParametroConstants.TIPODOCUMENTO).subscribe(
      (result: ParametroModel[]) => { this.documentos = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.SEXO).subscribe(
      (result: ParametroModel[]) => { this.generos = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.GRADOINSTRUCCION).subscribe(
        (result: ParametroModel[]) => { this.grados = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.DESTINOCREDITO).subscribe(
        (result: ParametroModel[]) => { this.destinos = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.TIPOACTIVIDAD).subscribe(
      (result: ParametroModel[]) => {this.actividades = result; }, error => console.error(error), );
    this.parametroService.getByPadreID(ParametroConstants.RUBROACTIVIDAD).subscribe(
      (result: ParametroModel[]) => {this.rubrosActividades = result; }, error => console.error(error), );
  }

  private registrarPrimerPaso(): void {

    this.mostrarMensaje = false;

    //this.registro.setAll(this.registroPaso1Formulario.value);
    //console.log(this.registro);
    this.registro.montoPrestamo = this.registroPaso1Formulario.value.montoPrestamo;
    this.registro.ingresoMensual = this.registroPaso1Formulario.value.ingresoMensual;
    this.registro.destinoPrestamo = this.registroPaso1Formulario.value.destinoPrestamo;
    this.registro.destinoDetalle = this.registroPaso1Formulario.value.destinoDetalle;
    this.registro.prestatario.nombres = this.registroPaso1Formulario.value.nombres;
    this.registro.prestatario.apellidoPaterno = this.registroPaso1Formulario.value.apellidoPaterno;
    this.registro.prestatario.apellidoMaterno = this.registroPaso1Formulario.value.apellidoMaterno;
    this.registro.prestatario.fechaNacimiento = this.registroPaso1Formulario.value.fechaNacimiento;
    this.registro.prestatario.tipoDocumento = this.registroPaso1Formulario.value.tipoDocumento;
    this.registro.prestatario.numeroDocumento = this.registroPaso1Formulario.value.numeroDocumento;
    this.registro.prestatario.digitoVerificacion = this.registroPaso1Formulario.value.digitoVerificacion;
    this.registro.prestatario.genero = this.registroPaso1Formulario.value.genero;
    this.registro.prestatario.correoPersonal = this.registroPaso1Formulario.value.correoPersonal;
    this.registro.prestatario.telefonoCelular = this.registroPaso1Formulario.value.telefonoCelular;
    this.registro.prestatario.gradoInstruccion = this.registroPaso1Formulario.value.gradoInstruccion;
    this.registro.prestatario.tipoActividad = this.registroPaso1Formulario.value.tipoActividad;
    this.registro.prestatario.tipoOcupacion = this.registroPaso1Formulario.value.tipoOcupacion;
    console.log(this.registro);

    // El metodo subscribe admite hasta 3 callbacks: subscribe(data, err, end)
    this.solicitudCreditoService.registerFirstStep(this.registro).subscribe(
      (respuesta: SolicitudCreditoResponseF1Model) => {
        // En la variable "respuesta" tenemos la info entregada por el servicio
        console.log('Registro grabado con exito!');
        console.log(respuesta);
        this.mostrarMensaje = true;
        this.mensajeError = 'Registro grabado con exito!';
        this.router.navigate(['/solicitud/evalua', respuesta.codigo]);
      }, (error => {
            console.error(error);
            this.mostrarMensaje = true;
            this.mensajeError = error;})
    );
  }

  navegar() {
    this.router.navigate(['/solicitud/evalua', 60]);
  }
}
