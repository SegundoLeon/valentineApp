import { Component, OnInit } from '@angular/core';
import { ParametroModel } from '../parametro.model';
import { ParametroService } from '../parametro.service';
import { EvaluacionService } from '../evaluacion.service';
import { RegistroPaso1Model } from '../registroPaso1.model';
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
import { MatDialog } from '@angular/material';
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
  registroPaso1Model: RegistroPaso1Model = new RegistroPaso1Model();
  productId: number;
  registroPaso1Formulario: FormGroup;
  mensajeError = '';
  mostrarMensaje = false;
  fechaDate: Date;
  fechaString: string;

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
      nombreSolicitante: [null, [Validators.required]],
      apellidoParternoSolicitante: [null, Validators.required],
      apellidoMaternoSolicitante: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: [null, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]*')]],
      digitoVerificacion: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      genero: [null, [Validators.required]],
      correoElectronico: [null, [Validators.required, Validators.email]],
      numeroCelular: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      ingresosMensuales: [null, [Validators.required]], 
      gradoInstruccion: [null, [Validators.required]],
      destinoCredito: [null, [Validators.required]],
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
  }

  private registrarPrimerPaso(): void {
    let persona: ReniecConsultaModel = new ReniecConsultaModel();
    persona.Nombres = this.registroPaso1Formulario.value.nombreSolicitante;
    persona.ApellidoPaterno = this.registroPaso1Formulario.value.apellidoParternoSolicitante;
    persona.ApellidoMaterno = this.registroPaso1Formulario.value.apellidoMaternoSolicitante;
    persona.NumeroDni = this.registroPaso1Formulario.value.numeroDocumento;
    persona.DigitoVerificacion = this.registroPaso1Formulario.value.digitoVerificacion;
    this.mostrarMensaje = false;

    // Verificar cliente en el Servicio de la RENIEC
    // (1) DNI y digito de verificacion deben coincider (2) apellidos y nombre deben estar contenidos
    // Se devuleve una cadena vacia cuando existe algun dato erroneo.
    this.solicitudCreditoService.validarDatosReniec(persona).subscribe((respuesta: ReniecRespuestaModel) => {

      // Ingresa si la RENIEC encontro alguna cohincidencia
      if (respuesta) {
        let nombre: string;
        
        if (persona.Nombres.search(' ') === -1) {
          nombre = persona.Nombres;
        } else {
          nombre = persona.Nombres.substring(0, persona.Nombres.indexOf(' '));
        }

        // Aqui verificamos que nombres y apellidos ingresados sean como los tiene la RENIEC
        // PENDIENTE: VERIFICAR QUE NO ARROGE ERROR POR COLOCAR MIS DATOS EN MINUSCULA
        if (nombre !== String(respuesta.PrimerNombre).trim() || persona.ApellidoPaterno !== respuesta.ApellidoPaterno ||
            persona.ApellidoMaterno !== respuesta.ApellidoMaterno) {
            this.mostrarMensaje = true;
            this.mensajeError = 'Revise que ha ingresado correctamente sus nombres y apellidos.';
        } else {
          // Estamos aqui si todo esta OK
          this.registroPaso1Formulario.patchValue({nombreSolicitante: respuesta.PrimerNombre || ' ' || respuesta.SegundoNombre});
          let correoRespuesta: CorreoRespuestaModel = new CorreoRespuestaModel();
          //alert('Los datos ingresados son validos!');

          // Verificar que el cliente no posea una solicitud de credito activa
          this.solicitudCreditoService.validarSolicitudExistente(this.registroPaso1Formulario.value.numeroDocumento)
          .subscribe((result: HistorialRespuestaModel) => {
          //  console.log(result);  });

            correoRespuesta.Email = this.registroPaso1Formulario.value.correoElectronico;

            if (result.Respuesta === '1') {
                correoRespuesta.EmailType = 1;
                //this.solicitudCreditoService.enviarMail(correoRespuesta).subscribe();
                this.router.navigate(['/resultado']);
                console.log('respuesta 1');
                return;
            } else if (result.Respuesta === '2') {
                correoRespuesta.EmailType = 2;
                //this.solicitudCreditoService.enviarMail(correoRespuesta).subscribe();
                //this.router.navigate(['/notSuccessClips']);
                console.log('respuesta 2');
                return;
            } else if (result.Respuesta === '3') {
                correoRespuesta.EmailType = 3;
                //this.solicitudCreditoService.enviarMail(correoRespuesta).subscribe();
                //this.router.navigate(['/notSuccessClips']);
                console.log('respuesta 3');
                return;
            } else {

              // El cliente no tiene una solicitud o credito activo
              // Se evalua el riesgo del ciente en nuestro modelo de riesgo
              var evaluacionConsultaModel: EvaluacionConsultaModel = new EvaluacionConsultaModel();
              evaluacionConsultaModel.NumeroDni = persona.NumeroDni;
              evaluacionConsultaModel.DigitoVerificacion = persona.DigitoVerificacion;
              evaluacionConsultaModel.ApellidoPaterno = persona.ApellidoPaterno;
              evaluacionConsultaModel.ApellidoMaterno = persona.ApellidoMaterno;
              evaluacionConsultaModel.Nombres = persona.Nombres;
              evaluacionConsultaModel.Parentesco = 'T'; // Es el titular del prestamo

              this.evaluacionService.obtenerEvaluacionRiesgo(evaluacionConsultaModel)
              .subscribe((resultado: EvaluacionRespuestaModel) => {
                if (resultado.Resultado === 'rechazada') {
                    correoRespuesta.EmailType = 4;
                    console.log('Solicitud rechazada por Modelo de Riesgo');
                    this.mostrarMensaje = true;
                    this.mensajeError = 'Solicitud rechazada por Modelo de Riesgo';
                    //this.solicitudCreditoService.enviarMail(correoRespuesta).subscribe();
                    //this.router.navigate(['/notSuccessClips']);
                } else {
                    // Cliente aceptado por el Modelo de Riesgo
                    console.log('Solicitud aceptada por Modelo de Riesgo');
                    this.mostrarMensaje = true;
                    this.mensajeError = 'Solicitud aceptada por Modelo de Riesgo';

                    this.registroPaso1Model.setAll(this.registroPaso1Formulario.value);
                    this.fechaDate = this.registroPaso1Formulario.value.fechaNacimiento;
                    this.fechaString = this.fechaDate.getDate().toString() + '/' + this.fechaDate.getMonth().toString() + '/' + this.fechaDate.getFullYear().toString();
                    this.registroPaso1Model.fechaNacimiento = this.fechaString;
                    this.registroPaso1Model.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
                    this.registroPaso1Model.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
                    this.registroPaso1Model.fechaRegistro = new Date();
                    this.registroPaso1Model.puntuacionBuro = resultado.PuntuacionBuro;

                    this.solicitudCreditoService.registerFirstStep(this.registroPaso1Model).subscribe(
                        (registerFirstStepModelResult: RegistroPaso1Model) => {
                            console.log('Registro grabado con exito!');
                            console.log(registerFirstStepModelResult);
                            this.mostrarMensaje = true;
                            this.mensajeError = 'Registro grabado con exito!';
                            // var localStorageModel: LocalStorageModel = new LocalStorageModel();
                            // localStorageModel.solicitudCreditoId = registerFirstStepModelResult.codigoSolCredito;
                            // localStorageModel.step = 2;
                            // this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                            this.router.navigate([`/solicitud/${registerFirstStepModelResult.codigoSolCredito}`]);
                   
                            
                        }, (error => {
                              console.error(error);
                              this.mostrarMensaje = true;
                              this.mensajeError = error;})
                    );
                }
              }, (error => {
                    this.mostrarMensaje = true;
                    this.mensajeError = error;})
              );
            }
          }, (error => {
                this.mostrarMensaje = true;
                this.mensajeError = error;})
          );

        }

      } else {
        this.mostrarMensaje = true;
        this.mensajeError = 'Problemas con el API de la RENIEC';
      }

    }, (error => {
          this.mostrarMensaje = true;
          this.mensajeError = 'Los datos proporcionados no existen, verifique.';})
    );
  }

  navegar() {
    this.router.navigate(['/solicitud', 60]);
  }
  
}
