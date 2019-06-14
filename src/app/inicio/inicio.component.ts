import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  template: `
    <img src="assets/images/portada.jpg" style="width:100%;">
    <br><br>
    <div class="contenedor">
      <button mat-raised-button color="primary" class="botonbanner" routerLink="/solicitud/evalua">
        Necesito un crédito
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button mat-raised-button color="primary" class="botonbanner" routerLink="/inversor">
        Quiero invertir
      </button>
      <h2>Bienvenidos a Valentine</h2>
      <p>Somos la nueva plataforma de prestamos e inversiones del Perú 100% en linea.</p>
    </div>
    `,
    styles: [`
    .contenedor {
      padding-left: 20px;
      padding-right: 20px;
    }
    .botonbanner {
      width: 180px;
    }
    `]
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

// colores posibles: primary, accent, warn, foreground, background
