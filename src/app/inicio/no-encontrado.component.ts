import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-encontrado',
  template: `
    <div class="contenedor">
      <h2>¡Página no encontrada!</h2>
      <mat-divider></mat-divider>
      <p>No encontramos la página solicitada, verifique y vuelva a ingresarla o ayudese de los menus.</p>
      <img src="assets/images/noecontrado.jpg">
    </div>
    `,
    styles: [`
    .contenedor {
      padding-left: 20px;
      padding-right: 20px;
    }
    `]
})
export class NoEncontradoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
