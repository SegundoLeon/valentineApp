import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-solicitud-paso3',
  templateUrl: './solicitud-paso3.component.html',
  styleUrls: ['./solicitud-paso3.component.scss']
})
export class SolicitudPaso3Component implements OnInit {
  codigoSolicitud: string;
  registroPaso3Formulario: FormGroup;   // Nombre del formulario en HTML
  mensajeError = '';
  mostrarMensaje = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.codigoSolicitud = this.route.snapshot.paramMap.get('id');
    console.log(this.codigoSolicitud);
   }

  ngOnInit() {
  }

  private registrarTercerPaso(): void {
  //   this.mostrarMensaje = false;
  //   this.registro.cuotas = this.registroPaso2Formulario.value.cuotas;
  //   this.registro.tipoCuentaBancaria = this.registroPaso2Formulario.value.tipoCuentaBancaria;
  //   this.registro.bancoCodigo = this.registroPaso2Formulario.value.bancoCodigo;
  //   this.registro.codigoInterbancario = this.registroPaso2Formulario.value.codigoInterbancario;
  //   this.registro.prestatario.pais = this.registroPaso2Formulario.value.pais;
  //   this.registro.prestatario.direccion = this.registroPaso2Formulario.value.direccion;
  //   this.registro.prestatario.departamento = this.registroPaso2Formulario.value.departamento;
  //   this.registro.prestatario.provincia = this.registroPaso2Formulario.value.provincia;
  //   this.registro.prestatario.distrito = this.registroPaso2Formulario.value.distrito;
  //   this.registro.prestatario.estadoCivil = this.registroPaso2Formulario.value.estadoCivil;
  //   this.registro.prestatario.lugarTrabajo = this.registroPaso2Formulario.value.lugarTrabajo;
  //   this.registro.prestatario.esPep = this.registroPaso2Formulario.value.esPep;
  //   this.registro.prestatario.cargoPep = this.registroPaso2Formulario.value.cargoPep;

  //   if (this.solicitanteCasado) {
  //     this.registro.prestatario.nombrePareja = this.registroPaso2Formulario.value.nombrePareja;
  //     this.registro.prestatario.apellidoPaternoPareja = this.registroPaso2Formulario.value.apellidoPaternoPareja;
  //     this.registro.prestatario.apellidoMaternoPareja = this.registroPaso2Formulario.value.apellidoMaternoPareja;
  //     this.registro.prestatario.tipoDocumentoPareja = this.registroPaso2Formulario.value.tipoDocumentoPareja;
  //     this.registro.prestatario.numeroDocumentoPareja = this.registroPaso2Formulario.value.numeroDocumentoPareja;
  //   }

  //   this.solicitudCreditoService.registerSecondStep(this.codigoSolicitud, this.registro).subscribe(
  //     (respuesta: SolicitudCreditoResponseF2Model) => {
  //       console.log(respuesta);
  //       this.router.navigate([`/solicitud/final`]);
  //     }, error => console.error(error)
  //   );
  }

  navegar() {
    this.router.navigate(['/solicitud/final']);
  }

}
