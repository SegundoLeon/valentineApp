import { Component, OnInit } from '@angular/core';
import { ParametroModel } from './parametro.model';
import { ParametroService } from './parametro.service';
import { EvaluacionService } from './evaluacion.service';
import { RegistroPaso1Model } from './registroPaso1.model';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SolicitudCreditoService } from './solicitud.service';
import { ParametroConstants } from './parametro.constants';
import { ReniecRespuestaModel } from './reniecRespuesta.model';
import { ReniecConsultaModel } from './reniecConsulta.model';
import { CorreoRespuestaModel } from './correoRespuesta.model';
import { HistorialRespuestaModel } from './historialRespuesta.model';
import { Router } from '@angular/router';
import { EvaluacionConsultaModel } from './evaluacionConsulta.model';
import { EvaluacionRespuestaModel } from './evaluacionRespuesta.model';
import { EstadoSolicitudCreditoConstants } from './estadoSolicitudCredito.constants';
import { EtapasSolicitudCreditoConstants } from './etapasSolicitudCredito.constants';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-solicitud-paso1',
  templateUrl: './solicitud-paso1.component.html',
  styleUrls: ['./solicitud-paso1.component.scss']
})
export class SolicitudPaso1Component implements OnInit {
  documentos: ParametroModel[] = [];
  generos: ParametroModel[] = [];
  grados: ParametroModel[] = [];
  destinos: ParametroModel[] = [];
  registroPaso1Model: RegistroPaso1Model = new RegistroPaso1Model();
  productId: number;
  registroPaso1Formulario: FormGroup;
  mensajeError = '';
  mostrarMensaje = false;

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
      fechaNacimiento: [null], tipoDocumento: [null],
      numeroDocumento: [null, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]*')]],
      digitoVerificacion: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      genero: [null],
      correoElectronico: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      numeroCelular: [null, [Validators.pattern('[0-9]*')]],
      ingresosMensuales: [null], gradoInstruccion: [null], destinoCredito: [null], aceptoTerminos: [null]
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
    this.solicitudCreditoService.validarDatosReniec(persona).subscribe((respuesta: ReniecRespuestaModel) => {

      if (respuesta) {
        let nombre: string;
        // La RENIEC devuleve una cadena vacia cuando existe algun dato erroneo.
        if (persona.Nombres.search(' ') === -1) {
          nombre = persona.Nombres;
        } else {
          nombre = persona.Nombres.substring(0, persona.Nombres.indexOf(' '));
        }

        // PENDIENTE: VERIFICAR QUE NO ARROGE ERROR POR COLOCAR MIS DATOS EN MINUSCULA
        if (nombre !== String(respuesta.PrimerNombre).trim() || persona.ApellidoPaterno !== respuesta.ApellidoPaterno ||
            persona.ApellidoMaterno !== respuesta.ApellidoMaterno) {
            this.mensajeError = 'Revise su nombre, número de documento o el digito de verificacion.';
            console.log(nombre + ' validando nombres');
        } else {
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

              // Evaluar cliente en central de riesgos
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
                    console.log('rechazada');
                    //this.solicitudCreditoService.enviarMail(correoRespuesta).subscribe();
                    //this.router.navigate(['/notSuccessClips']);
                } else {
                    this.registroPaso1Model.setAll(this.registroPaso1Formulario.value);
                    this.registroPaso1Model.fechaNacimiento = this.registroPaso1Formulario.value.fechaNacimiento.formatted;
                    this.registroPaso1Model.estado = EstadoSolicitudCreditoConstants.REGISTROENPROCESO;
                    this.registroPaso1Model.etapa = EtapasSolicitudCreditoConstants.REGISTRO;
                    this.registroPaso1Model.fechaRegistro = new Date();
                    this.registroPaso1Model.puntuacionBuro = resultado.PuntuacionBuro;
                    console.log('aceptada');
                    console.log(this.registroPaso1Model);

                    this.solicitudCreditoService.registerFirstStep(this.registroPaso1Model).subscribe(
                        (registerFirstStepModelResult: RegistroPaso1Model) => {
                            console.log('aceptada');
                            console.log(registerFirstStepModelResult);
                            // var localStorageModel: LocalStorageModel = new LocalStorageModel();
                            // localStorageModel.solicitudCreditoId = registerFirstStepModelResult.codigoSolCredito;
                            // localStorageModel.step = 2;
                            // this.storageManager.savePermanentData(localStorageModel, LocalStoreManager.DBKEY_USER_DATA);
                            //this.router.navigate([`/registerSecondStep/${registerFirstStepModelResult.codigoSolCredito}`]);
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
          }, (error => {
                this.mostrarMensaje = true;
                this.mensajeError = error;})
          );

        }

      } else {
        this.mensajeError = 'Problemas con el API de la RENIEC';
      }

    }, (error => {
          this.mostrarMensaje = true;
          this.mensajeError = 'Los datos proporcionados no existen, verifique.';})



    );

  }


}
